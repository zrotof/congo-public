import { Injectable, inject, signal, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketService } from './socket.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalStatsService implements OnDestroy {
  private http = inject(HttpClient);
  private socketService = inject(SocketService);
  private readonly API_URL = `${environment.apiUrl}/stats`; // Route dédiée qu'on a créée

  // Signal qui contient le nombre total de visites (Source of Truth)
  totalVisits = signal<number>(0);

  // État de chargement (optionnel mais utile)
  isLoading = signal<boolean>(false);

  /**
   * Initialise le service :
   * 1. Récupère la valeur initiale via API
   * 2. Connecte le socket pour le temps réel
   */
  init(): void {
    this.fetchInitialStats();
    this.initSocketListeners();
  }

  /**
   * Récupère la valeur initiale au chargement
   */
  private fetchInitialStats(): void {
    this.isLoading.set(true);
    this.http.get<{ status: string, data: { totalVisits: number } }>(this.API_URL)
      .subscribe({
        next: (res) => {
          this.totalVisits.set(res.data.totalVisits);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('❌ Erreur récupération stats globales:', err);
          this.isLoading.set(false);
        }
      });
  }

  /**
   * Configure les écouteurs Socket.io
   */
  private initSocketListeners(): void {
    // S'assurer que le socket est connecté
    this.socketService.connect();
    
    // Rejoindre la "room" globale pour recevoir les updates
    // Cela déclenchera aussi +1 visite côté backend
    this.socketService.emit('JOIN_GLOBAL');

    // Écouter les mises à jour en temps réel
    this.socketService.on<{ totalVisits: number }>('GLOBAL_UPDATE', (data) => {
      // console.log('🌍 Nouveau total global:', data.totalVisits);
      this.totalVisits.set(data.totalVisits);
    });
  }

  /**
   * Nettoyage à la destruction du service (rare car providedIn: 'root', mais bonne pratique)
   */
  ngOnDestroy(): void {
    this.socketService.emit('LEAVE_GLOBAL');
    this.socketService.off('GLOBAL_UPDATE');
  }
}