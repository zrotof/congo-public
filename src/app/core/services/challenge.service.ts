import { Injectable, inject, signal, computed, OnDestroy, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SocketService } from './socket.service';
import {
  Challenge,
  ChallengeState,
  ChallengeRevealData,
  ApiResponse
} from '../models/challenge.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService implements OnDestroy {
  private http = inject(HttpClient);
  private socketService = inject(SocketService);
  private ngZone = inject(NgZone);
  private readonly API_URL = `${environment.apiUrl}/challenges/public`;

  // Signals internes
  private _challenge = signal<Challenge | null>(null);
  private _challengeState = signal<ChallengeState | null>(null);
  private _originalImageUrl = signal<string | null>(null);
  private _isRevealed = signal<boolean>(false);

  // Propriétés publiques
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  isConnected = this.socketService.connectedSignal;

  // Computed
  challenge = computed(() => {
    const c = this._challenge();
    const s = this._challengeState();
    if (!c) return null;
    return {
      ...c,
      currentViews: s?.currentViews ?? c.currentViews,
      isRevealed: s?.isRevealed ?? c.isRevealed ?? false,
      // Utilisation directe du progress backend
      progress: s?.progress ?? c.progress ?? 0
    };
  });

  currentViews = computed(() => this.challenge()?.currentViews ?? 0);
  isRevealed = computed(() => this._isRevealed());
  progress = computed(() => this.challenge()?.progress ?? 0);
  
  imageUrl = computed(() => {
    const c = this._challenge();
    const original = this._originalImageUrl();
    if (this._isRevealed() && original) return original;
    return c?.blurredImageUrl || c?.imageUrl || '';
  });

  private isListening = false;

  fetchActiveChallenge(): Observable<ApiResponse<Challenge>> {
    return this.http.get<ApiResponse<Challenge>>(`${this.API_URL}/active`);
  }

  loadChallenge(): void {
    this.isLoading.set(true);
    this.fetchActiveChallenge().subscribe({
      next: (res) => {
        if (res.data) {
          this._challenge.set(res.data);
          this._isRevealed.set(res.data.isRevealed ?? false);
          if (res.data.isRevealed && res.data.imageUrl) {
             this._originalImageUrl.set(res.data.imageUrl);
          }
          
          this.initSocketAndJoin();
        } else {
          this.error.set('Aucun challenge actif');
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('❌ Erreur Challenge:', err);
        this.isLoading.set(false);
      }
    });
  }

  // ... (Reste du code Socket identique) ...
  
  private initSocketAndJoin(): void {
    if (this.isListening) return;
    this.setupListeners();
    this.isListening = true;

    const joinAction = () => {
      this.socketService.emit('JOIN_CHALLENGE');
    };

    if (this.socketService.isConnected()) {
      joinAction();
    } else {
      this.socketService.once('connect', joinAction);
    }
  }

  private setupListeners(): void {
    this.socketService.on<ChallengeState>('CHALLENGE_UPDATE', (data) => {
      this.ngZone.run(() => {
        this._challengeState.set(data);
        this._isRevealed.set(data.isRevealed);
        if (data.isRevealed && data.originalImageUrl) {
          this._originalImageUrl.set(data.originalImageUrl);
        }
      });
    });

    this.socketService.on<ChallengeState>('CHALLENGE_STATE', (data) => {
      this.ngZone.run(() => this._challengeState.set(data));
    });

    this.socketService.on<ChallengeRevealData>('CHALLENGE_REVEALED', (data) => {
      this.ngZone.run(() => {
        this._originalImageUrl.set(data.originalImageUrl);
        this._isRevealed.set(true);
      });
    });
  }

  leaveChallenge(): void {
    if (this.socketService.isConnected()) {
      this.socketService.emit('LEAVE_CHALLENGE');
    }
  }

  cleanup(): void {
    this.socketService.off('CHALLENGE_UPDATE');
    this.socketService.off('CHALLENGE_STATE');
    this.socketService.off('CHALLENGE_REVEALED');
    this.isListening = false;
  }

  ngOnDestroy(): void {
    this.leaveChallenge();
    this.cleanup();
  }
}