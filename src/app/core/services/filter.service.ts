import { Injectable, inject, signal, computed, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { SocketService } from './socket.service';
import { SnapFilter, FiltersState, FilterState } from '../models/snapfilter.model'; // Assure-toi que les imports sont bons
import { ApiResponse } from '../models/challenge.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService implements OnDestroy {
  private http = inject(HttpClient);
  private socketService = inject(SocketService);
  private readonly API_URL = `${environment.apiUrl}/filters/public`;

  // ══════════════════════════════════════════════════════
  //                    SIGNALS (État)
  // ══════════════════════════════════════════════════════

  // Liste brute des filtres (données statiques)
  private _filters = signal<SnapFilter[]>([]);
  
  // Map des compteurs temps réel (ID -> Count)
  private _filterCounters = signal<Map<number, number>>(new Map());

  // États UI
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  private isListening = false;
  private hasJoined = false;

  // ══════════════════════════════════════════════════════
  //                    COMPUTED (Public)
  // ══════════════════════════════════════════════════════

  /**
   * Retourne la liste des filtres enrichie avec les compteurs temps réel
   */
  filters = computed(() => {
    const filters = this._filters();
    const counters = this._filterCounters();

    return filters.map(filter => ({
      ...filter,
      // Si on a une valeur temps réel, on l'utilise, sinon la valeur initiale
      usageCount: counters.get(filter.id) ?? filter.usageCount
    }));
  });

  /**
   * Total de tous les clics sur les filtres
   */
  totalUsage = computed(() => {
    return this.filters().reduce((sum, f) => sum + f.usageCount, 0);
  });

  // ══════════════════════════════════════════════════════
  //                    API REST
  // ══════════════════════════════════════════════════════

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

          // Initialiser la Map des compteurs avec les valeurs de la DB
          const counters = new Map<number, number>();
          res.data.forEach(f => counters.set(f.id, f.usageCount));
          this._filterCounters.set(counters);

          // Démarrer le temps réel
          this.initSocketAndJoin();
        } else {
          this._filters.set([]);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('❌ Erreur chargement filtres:', err);
        this.error.set('Impossible de charger les filtres');
        this.isLoading.set(false);
      }
    });
  }

  // ══════════════════════════════════════════════════════
  //                    SOCKET.IO
  // ══════════════════════════════════════════════════════

  private initSocketAndJoin(): void {
    if (this.isListening) {
      this.joinFilters();
      return;
    }

    this.socketService.connect();
    this.setupListeners();
    this.isListening = true;

    // Attendre la connexion avant de rejoindre la room
    const checkConnection = setInterval(() => {
      if (this.socketService.isConnected()) {
        clearInterval(checkConnection);
        this.joinFilters();
      }
    }, 100);

    setTimeout(() => clearInterval(checkConnection), 5000);
  }

  private setupListeners(): void {
    // 1. Recevoir l'état initial de tous les compteurs
    this.socketService.on<FiltersState>('FILTERS_STATE', (data) => {
      const counters = new Map<number, number>();
      data.filters.forEach(f => counters.set(f.filterId, f.usageCount));
      this._filterCounters.set(counters);
    });

    // 2. Recevoir une mise à jour d'un seul filtre (quand qqun clique)
    this.socketService.on<FilterState>('FILTER_UPDATE', (data) => {
      this._filterCounters.update(counters => {
        const newCounters = new Map(counters); // Copie immuable
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

  /**
   * Action : L'utilisateur clique sur un filtre
   * Envoie l'événement au serveur pour incrémenter le compteur
   */
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