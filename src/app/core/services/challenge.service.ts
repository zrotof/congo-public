import { Injectable, inject, signal, computed, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { SocketService } from './socket.service';
import {
  Challenge,
  ChallengeState,
  ChallengeRevealData,
  ApiResponse
} from '../models/challenge.model';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService implements OnDestroy {
  private http = inject(HttpClient);
  private socketService = inject(SocketService);
  private readonly API_URL = `${environment.apiUrl}/challenges/public`;

  // ══════════════════════════════════════════════════════
  //                    SIGNALS
  // ══════════════════════════════════════════════════════

  // Challenge data (from REST API)
  private _challenge = signal<Challenge | null>(null);
  
  // Real-time state (from Socket.io)
  private _challengeState = signal<ChallengeState | null>(null);
  
  // Original image URL (when revealed)
  private _originalImageUrl = signal<string | null>(null);
  
  // Is revealed flag
  private _isRevealed = signal<boolean>(false);

  // Loading & Error states
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  private isListening = false;

  // ══════════════════════════════════════════════════════
  //                    COMPUTED (Public API)
  // ══════════════════════════════════════════════════════

  /** Challenge data */
  challenge = computed(() => {
    const challenge = this._challenge();
    const state = this._challengeState();
    
    if (!challenge) return null;
    
    // Merge real-time state with challenge data
    return {
      ...challenge,
      currentViews: state?.currentViews ?? challenge.currentViews,
      isRevealed: state?.isRevealed ?? challenge.isRevealed ?? false,
      progress: state?.progress ?? (challenge.currentViews / challenge.targetViews) * 100
    };
  });

  /** Current views (real-time) */
  currentViews = computed(() => {
    return this._challengeState()?.currentViews ?? this._challenge()?.currentViews ?? 0;
  });

  /** Target views */
  targetViews = computed(() => {
    return this._challengeState()?.targetViews ?? this._challenge()?.targetViews ?? 0;
  });

  /** Progress percentage */
  progress = computed(() => {
    return this._challengeState()?.progress ?? 0;
  });

  /** Is challenge revealed */
  isRevealed = computed(() => this._isRevealed());

  /** Image URL to display (blurred or original) */
  imageUrl = computed(() => {
    const challenge = this._challenge();
    const originalUrl = this._originalImageUrl();
    const revealed = this._isRevealed();

    if (revealed && originalUrl) {
      return originalUrl;
    }

    return challenge?.blurredImageUrl || challenge?.imageUrl || '';
  });

  /** Is socket connected */
  isConnected = computed(() => this.socketService.isConnected());

  // ══════════════════════════════════════════════════════
  //                    API REST
  // ══════════════════════════════════════════════════════

  /**
   * Fetch active challenge from API
   */
  fetchActiveChallenge(): Observable<ApiResponse<Challenge>> {
    this.isLoading.set(true);
    this.error.set(null);
    return this.http.get<ApiResponse<Challenge>>(`${this.API_URL}/active`);
  }

  /**
   * Load challenge and initialize socket
   */
  loadChallenge(): void {
    this.fetchActiveChallenge().subscribe({
      next: (res) => {
        if (res.data) {
          this._challenge.set(res.data);
          this._isRevealed.set(res.data.isRevealed ?? false);
          
          if (res.data.isRevealed && res.data.imageUrl) {
            this._originalImageUrl.set(res.data.imageUrl);
          }

          // Initialize socket and join challenge
          this.initSocket();
          
          // Wait for socket connection before joining
          setTimeout(() => {
            this.joinChallenge();
          }, 500);
        } else {
          this.error.set('Aucun challenge actif');
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erreur chargement challenge:', err);
        this.error.set('Impossible de charger le challenge');
        this.isLoading.set(false);
      }
    });
  }

  // ══════════════════════════════════════════════════════
  //                    SOCKET.IO
  // ══════════════════════════════════════════════════════

  /**
   * Initialize socket connection and listeners
   */
  initSocket(): void {
    if (this.isListening) return;

    this.socketService.connect();
    this.setupListeners();
    this.isListening = true;
  }

  /**
   * Setup socket event listeners
   */
  private setupListeners(): void {
    // Initial state
    this.socketService.on<ChallengeState>('CHALLENGE_STATE', (data) => {
      console.log('📊 État initial:', data);
      this.updateState(data);
    });

    // Real-time updates
    this.socketService.on<ChallengeState>('CHALLENGE_UPDATE', (data) => {
      console.log('🔄 Mise à jour:', data);
      this.updateState(data);
    });

    // Challenge revealed
    this.socketService.on<ChallengeRevealData>('CHALLENGE_REVEALED', (data) => {
      console.log('🎉 Révélé !', data);
      this._originalImageUrl.set(data.originalImageUrl);
      this._isRevealed.set(true);
    });

    // Error
    this.socketService.on<{ message: string }>('CHALLENGE_ERROR', (data) => {
      console.error('❌ Erreur:', data.message);
      this.error.set(data.message);
    });
  }

  /**
   * Update local state from socket data
   */
  private updateState(data: ChallengeState): void {
    this._challengeState.set(data);
    this._isRevealed.set(data.isRevealed);

    if (data.isRevealed && data.originalImageUrl) {
      this._originalImageUrl.set(data.originalImageUrl);
    }
  }

  /**
   * Join challenge room (triggers +1 view)
   */
  joinChallenge(): void {
    this.socketService.emit('JOIN_CHALLENGE');
  }

  /**
   * Leave challenge room
   */
  leaveChallenge(): void {
    this.socketService.emit('LEAVE_CHALLENGE');
  }

  /**
   * Cleanup listeners
   */
  cleanup(): void {
    this.socketService.off('CHALLENGE_STATE');
    this.socketService.off('CHALLENGE_UPDATE');
    this.socketService.off('CHALLENGE_REVEALED');
    this.socketService.off('CHALLENGE_ERROR');
    this.isListening = false;
  }

  ngOnDestroy(): void {
    this.leaveChallenge();
    this.cleanup();
  }
}