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
  private ngZone = inject(NgZone); // ✅ Pour forcer la mise à jour UI
  private readonly API_URL = `${environment.apiUrl}/stats`;

  totalVisits = signal<number>(0);
  isLoading = signal<boolean>(false);

  private hasJoined = false;

  init(): void {
    this.fetchInitialStats();
    this.initSocketListeners();
  }

  private fetchInitialStats(): void {
    this.isLoading.set(true);
    this.http.get<{ status: string, data: { totalVisits: number } }>(this.API_URL)
      .subscribe({
        next: (res) => {
          // On met à jour avec l'API, mais on sait que le socket aura le dernier mot
          if (this.totalVisits() === 0) {
            this.totalVisits.set(res.data.totalVisits);
          }
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('❌ Erreur stats:', err);
          this.isLoading.set(false);
        }
      });
  }

  private initSocketListeners(): void {
    this.socketService.connect();

    // Attendre la connexion avant de rejoindre
    const checkInterval = setInterval(() => {
      if (this.socketService.isConnected()) {
        clearInterval(checkInterval);
        this.joinGlobalRoom();
      }
    }, 100);

    setTimeout(() => clearInterval(checkInterval), 5000);

    // Écoute des mises à jour des AUTRES visiteurs
    this.socketService.on<{ totalVisits: number }>('GLOBAL_UPDATE', (data) => {
      console.log('🌍 Socket Broadcast Reçu:', data.totalVisits);
      this.ngZone.run(() => {
        this.totalVisits.set(data.totalVisits);
      });
    });
  }

  private joinGlobalRoom() {
    if (!this.hasJoined) {
      console.log('📤 Envoi JOIN_GLOBAL avec demande de réponse...');
      
      // ✅ APPEL AVEC CALLBACK
      this.socketService.emit('JOIN_GLOBAL', null, (response: { totalVisits: number }) => {
        console.log('✅ Réponse directe du serveur (Callback):', response);
        
        // Mise à jour immédiate et forcée
        this.ngZone.run(() => {
          this.totalVisits.set(response.totalVisits);
        });
      });

      this.hasJoined = true;
    }
  }

  ngOnDestroy(): void {
    this.socketService.emit('LEAVE_GLOBAL');
    this.socketService.off('GLOBAL_UPDATE');
    this.hasJoined = false;
  }
}