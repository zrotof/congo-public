import { Injectable, signal, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment.development';

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
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    this.socket.on('connect', () => {
      console.log('✅ Socket connecté:', this.socket?.id);
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
      console.warn('⚠️ Socket non connecté');
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