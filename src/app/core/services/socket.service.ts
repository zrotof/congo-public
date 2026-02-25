import { Injectable, signal, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy {
  private socket: Socket | null = null;

  // Signal réactif pour l'UI
  connectedSignal = signal<boolean>(false);

  connect(): void {
    if (this.socket?.connected) {
      console.log('🔌 Socket déjà connecté');
      return;
    }

    console.log('🔌 Connexion à:', environment.socketUrl);

    this.socket = io(environment.socketUrl, {
      withCredentials: true,
      transports: ['polling'],
      upgrade: false,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      timeout: 20000
    });

    this.socket.on('connect', () => {
      console.log('✅ Socket connecté ID:', this.socket?.id);
      this.connectedSignal.set(true);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ Socket déconnecté:', reason);
      this.connectedSignal.set(false);
    });

    this.socket.on('connect_error', (error) => {
      console.error('⚠️ Erreur Socket:', error.message);
      this.connectedSignal.set(false);
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connectedSignal.set(false);
    }
  }

  /**
   * Vérifie l'état réel du socket
   */
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  /**
   * Écouter un événement une seule fois (Utile pour l'init)
   */
  once(event: string, callback: () => void): void {
    this.socket?.once(event, callback);
  }

  emit(event: string, data?: any, callback?: Function): void {
    if (this.socket?.connected) {
      // console.log('📤 Émis:', event);
      this.socket.emit(event, data, callback);
    } else {
      console.warn(`⚠️ Socket non connecté, mise en attente de '${event}'`);
      // Retry automatique à la connexion
      this.socket?.once('connect', () => {
        console.log(`📤 Envoi différé de '${event}'`);
        this.socket?.emit(event, data, callback);
      });
    }
  }

  on<T>(event: string, callback: (data: T) => void): void {
    this.socket?.on(event, callback);
  }

  off(event: string): void {
    this.socket?.off(event);
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}