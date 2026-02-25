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
    this.registerVisit();
    this.initSocketListeners();
  }

  private registerVisit(): void {
    this.isLoading.set(true);
    this.http.post<{ status: string, data: { totalVisits: number } }>(`${this.API_URL}/visit`, {})
      .subscribe({
        next: (res) => {
          this.ngZone.run(() => this.totalVisits.set(res.data.totalVisits));
          this.isLoading.set(false);
        },
        error: () => this.isLoading.set(false)
      });
  }

  private initSocketListeners(): void {
    // Pas de connect() ici, AppComponent s'en charge
    
    const joinAction = () => {
      if (!this.hasJoined) {
        this.socketService.emit('JOIN_GLOBAL');
        this.hasJoined = true;
      }
    };

    if (this.socketService.isConnected()) {
      joinAction();
    } else {
      this.socketService.once('connect', joinAction);
    }

    this.socketService.on<{ totalVisits: number }>('GLOBAL_UPDATE', (data) => {
      this.ngZone.run(() => this.totalVisits.set(data.totalVisits));
    });
  }

  ngOnDestroy(): void {
    // ✅ Ne pas émettre si non connecté (évite les warnings)
    if (this.socketService.isConnected()) {
      this.socketService.emit('LEAVE_GLOBAL');
    }
    this.socketService.off('GLOBAL_UPDATE');
    this.hasJoined = false;
  }
}