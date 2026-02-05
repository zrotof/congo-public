import { Injectable, signal, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy {
  private socket: Socket | null = null;

  isConnected = signal<boolean>(false);
  connectionError = signal<string | null>(null);

  connect(): void {
    if (this.socket?.connected) {
      console.log('🔌 Socket déjà connecté:', this.socket.id);
      return;
    }

    console.log('🔌 Connexion à:', environment.socketUrl);

    this.socket = io(environment.socketUrl, {
      withCredentials: true,
      // ✅ SOLUTION : Forcer le polling uniquement (pas de WebSocket)
      transports: ['polling'],
      // ✅ Upgrade désactivé pour éviter les tentatives WebSocket
      upgrade: false,
      // ✅ Options de reconnexion
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      // ✅ Timeout plus long pour le polling
      timeout: 20000,
      // ✅ Forcer le nouveau parser
      forceNew: true
    });

    this.socket.on('connect', () => {
      console.log('✅ Socket connecté (polling):', this.socket?.id);
      this.isConnected.set(true);
      this.connectionError.set(null);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ Socket déconnecté:', reason);
      this.isConnected.set(false);
    });

    this.socket.on('connect_error', (error) => {
      console.error('⚠️ Erreur Socket:', error.message);
      this.connectionError.set(error.message);
      this.isConnected.set(false);
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log('🔄 Reconnecté après', attemptNumber, 'tentative(s)');
      this.isConnected.set(true);
    });

    this.socket.on('reconnect_attempt', (attemptNumber) => {
      console.log('🔄 Tentative de reconnexion #', attemptNumber);
    });

    this.socket.on('reconnect_error', (error) => {
      console.error('⚠️ Erreur de reconnexion:', error.message);
    });

    this.socket.on('reconnect_failed', () => {
      console.error('❌ Reconnexion échouée après toutes les tentatives');
      this.connectionError.set('Impossible de se reconnecter au serveur');
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected.set(false);
    }
  }

  emit(event: string, data?: any): void {
    if (this.socket?.connected) {
      console.log('📤 Émis:', event, data || '');
      this.socket.emit(event, data);
    } else {
      console.warn('⚠️ Socket non connecté, mise en file d\'attente...');
      // Réessayer après connexion
      this.socket?.once('connect', () => {
        console.log('📤 Émis (après reconnexion):', event, data || '');
        this.socket?.emit(event, data);
      });
    }
  }

  on<T>(event: string, callback: (data: T) => void): void {
    this.socket?.on(event, (data: T) => {
      console.log('📥 Reçu:', event, data);
      callback(data);
    });
  }

  off(event: string): void {
    this.socket?.off(event);
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}