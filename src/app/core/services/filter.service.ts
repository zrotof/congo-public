import { Injectable, inject, signal, computed, OnDestroy, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketService } from './socket.service';
import { environment } from '../../../environments/environment';
import { SnapFilter, FiltersState, FilterState } from '../models/snapfilter.model';
import { ApiResponse } from '../models/challenge.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService implements OnDestroy {
  private http = inject(HttpClient);
  private socketService = inject(SocketService);
  private ngZone = inject(NgZone);
  private readonly API_URL = `${environment.apiUrl}/filters/public`;

  private _filters = signal<SnapFilter[]>([]);
  private _filterCounters = signal<Map<number, number>>(new Map());

  // ✅ PROPRIÉTÉ PUBLIQUE (Pour corriger l'erreur TS)
  isLoading = signal<boolean>(false);
  
  error = signal<string | null>(null);
  private isListening = false;

  filters = computed(() => {
    const filters = this._filters();
    const counters = this._filterCounters();
    return filters.map(f => ({ ...f, usageCount: counters.get(f.id) ?? f.usageCount }));
  });

  totalUsage = computed(() => this.filters().reduce((sum, f) => sum + f.usageCount, 0));

  loadFilters(): void {
    this.isLoading.set(true); // ✅ Utilisation
    this.http.get<ApiResponse<SnapFilter[]>>(this.API_URL).subscribe({
      next: (res) => {
        if (res.data) {
          this._filters.set(res.data);
          const counters = new Map<number, number>();
          res.data.forEach(f => counters.set(f.id, f.usageCount));
          this._filterCounters.set(counters);
          
          this.initSocketAndJoin();
        }
        this.isLoading.set(false); // ✅
      },
      error: () => this.isLoading.set(false) // ✅
    });
  }

  private initSocketAndJoin(): void {
    if (this.isListening) return;
    
    this.setupListeners();
    this.isListening = true;

    const joinAction = () => {
      this.socketService.emit('JOIN_FILTERS');
    };

    if (this.socketService.isConnected()) {
      joinAction();
    } else {
      this.socketService.once('connect', joinAction);
    }
  }

  private setupListeners(): void {
    this.socketService.on<FiltersState>('FILTERS_STATE', (data) => {
      this.ngZone.run(() => {
        const counters = new Map();
        data.filters.forEach(f => counters.set(f.filterId, f.usageCount));
        this._filterCounters.set(counters);
      });
    });

    this.socketService.on<FilterState>('FILTER_UPDATE', (data) => {
      this.ngZone.run(() => {
        this._filterCounters.update(map => {
          const newMap = new Map(map);
          newMap.set(data.filterId, data.usageCount);
          return newMap;
        });
      });
    });
  }

  useFilter(filterId: number): void {
    this.socketService.emit('FILTER_CLICK', { filterId });
  }

  leaveFilters(): void {
    // ✅ Ne pas émettre si non connecté (évite les warnings)
    if (this.socketService.isConnected()) {
      this.socketService.emit('LEAVE_FILTERS');
    }
  }

  cleanup(): void {
    this.socketService.off('FILTERS_STATE');
    this.socketService.off('FILTER_UPDATE');
    this.isListening = false;
  }

  ngOnDestroy(): void {
    this.leaveFilters();
    this.cleanup();
  }
}