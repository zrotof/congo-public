import { Injectable, inject, signal, computed, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { SocketService } from './socket.service';
import { SnapFilter, FilterState, FiltersState } from '../models/snapfilter.model';
import { ApiResponse } from '../models/challenge.model';

@Injectable({
  providedIn: 'root'
})
export class SnapFilterService implements OnDestroy {
  private http = inject(HttpClient);
  private socketService = inject(SocketService);
  private readonly API_URL = `${environment.apiUrl}/snapfilters/public`;

  // État interne
  private _filters = signal<SnapFilter[]>([]);
  private _filterCounters = signal<Map<number, number>>(new Map());

  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  private isListening = false;
  private hasJoined = false;

  // Computed : Filtres avec compteurs temps réel
  filters = computed(() => {
    const filters = this._filters();
    const counters = this._filterCounters();

    return filters.map(filter => ({
      ...filter,
      usageCount: counters.get(filter.id) ?? filter.usageCount
    }));
  });

  // Total des utilisations
  totalUsage = computed(() => {
    return this.filters().reduce((sum, f) => sum + f.usageCount, 0);
  });

  isConnected = computed(() => this.socketService.isConnected());

  // API
  fetchActiveFilters(): Observable<ApiResponse<SnapFilter[]>> {
    return this.http.get<ApiResponse<SnapFilter[]>>(this.API_URL);
  }

  loadFilters(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.fetchActiveFilters().subscribe({
      next: (res) => {
        if (res.data && res.data.length > 0) {
          this._filters.set(res.data);

          // Initialiser les compteurs
          const counters = new Map<number, number>();
          res.data.forEach(f => counters.set(f.id, f.usageCount));
          this._filterCounters.set(counters);

          this.initSocketAndJoin();
        } else {
          this._filters.set([]);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('❌ Erreur filtres:', err);
        this.error.set('Impossible de charger les filtres');
        this.isLoading.set(false);
      }
    });
  }

  // Socket
  private initSocketAndJoin(): void {
    if (this.isListening) {
      this.joinFilters();
      return;
    }

    this.socketService.connect();
    this.setupListeners();
    this.isListening = true;

    const checkConnection = setInterval(() => {
      if (this.socketService.isConnected()) {
        clearInterval(checkConnection);
        this.joinFilters();
      }
    }, 100);

    setTimeout(() => clearInterval(checkConnection), 5000);
  }

  private setupListeners(): void {
    // État initial de tous les filtres
    this.socketService.on<FiltersState>('FILTERS_STATE', (data) => {
      const counters = new Map<number, number>();
      data.filters.forEach(f => counters.set(f.filterId, f.usageCount));
      this._filterCounters.set(counters);
    });

    // Mise à jour d'un filtre
    this.socketService.on<FilterState>('FILTER_UPDATE', (data) => {
      this._filterCounters.update(counters => {
        const newCounters = new Map(counters);
        newCounters.set(data.filterId, data.usageCount);
        return newCounters;
      });
    });
  }

  joinFilters(): void {
    if (this.hasJoined || !this.socketService.isConnected()) return;
    this.socketService.emit('JOIN_FILTERS');
    this.hasJoined = true;
  }

  leaveFilters(): void {
    if (this.hasJoined) {
      this.socketService.emit('LEAVE_FILTERS');
      this.hasJoined = false;
    }
  }

  // Action : Cliquer sur un filtre
  useFilter(filterId: number): void {
    this.socketService.emit('FILTER_CLICK', { filterId });
  }

  cleanup(): void {
    this.socketService.off('FILTERS_STATE');
    this.socketService.off('FILTER_UPDATE');
    this.isListening = false;
    this.hasJoined = false;
  }

  ngOnDestroy(): void {
    this.leaveFilters();
    this.cleanup();
  }
}