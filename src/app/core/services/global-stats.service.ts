import { Injectable, inject, signal, OnDestroy, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketService } from './socket.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalStatsService implements OnDestroy {
  private http = inject(HttpClient);
  private socketService = inject(SocketService);
  private ngZone = inject(NgZone);
  private readonly API_URL = `${environment.apiUrl}/stats`;

  totalVisits = signal<number>(0);
  isLoading = signal<boolean>(false);

  private hasJoined = false;

  init(): void {
    // 1. Enregistrer la visite via HTTP (POST)
    // Cela nous garantit de recevoir la valeur incrémentée
    this.registerVisit();
    
    // 2. Connecter le socket pour recevoir les mises à jour des AUTRES
    this.initSocketListeners();
  }

  private registerVisit(): void {
    this.isLoading.set(true);
    // Appel POST qui déclenche l'incrément côté serveur
    this.http.post<{ status: string, data: { totalVisits: number } }>(`${this.API_URL}/visit`, {})
      .subscribe({
        next: (res) => {
          console.log('✅ Visite validée. Total:', res.data.totalVisits);
          this.ngZone.run(() => {
            this.totalVisits.set(res.data.totalVisits);
          });
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('❌ Erreur API Visit:', err);
          this.isLoading.set(false);
        }
      });
  }

  private initSocketListeners(): void {
    this.socketService.connect();

    // Rejoindre la room (pour écoute passive)
    const checkInterval = setInterval(() => {
      if (this.socketService.isConnected()) {
        clearInterval(checkInterval);
        if (!this.hasJoined) {
          this.socketService.emit('JOIN_GLOBAL');
          this.hasJoined = true;
        }
      }
    }, 100);

    setTimeout(() => clearInterval(checkInterval), 5000);

    // Écouter les mises à jour (Broadcast)
    this.socketService.on<{ totalVisits: number }>('GLOBAL_UPDATE', (data) => {
      // console.log('🌍 Update Temps réel:', data.totalVisits);
      this.ngZone.run(() => {
        this.totalVisits.set(data.totalVisits);
      });
    });
  }

  ngOnDestroy(): void {
    this.socketService.emit('LEAVE_GLOBAL');
    this.socketService.off('GLOBAL_UPDATE');
    this.hasJoined = false;
  }
}