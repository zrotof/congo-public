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
      return;
    }

    this.socket = io(environment.socketUrl, {
      withCredentials: true,
      transports: ['polling'],
      upgrade: false,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      timeout: 20000,
      forceNew: true
    });

    this.socket.on('connect', () => {
      this.isConnected.set(true);
      this.connectionError.set(null);
    });

    this.socket.on('disconnect', (reason) => {
      this.isConnected.set(false);
    });

    this.socket.on('connect_error', (error) => {
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

  /**
   * Émettre un événement avec un callback optionnel
   * @param event Nom de l'événement
   * @param data Données à envoyer (ou null)
   * @param callback Fonction de réponse du serveur
   */
  emit(event: string, data?: any, callback?: Function): void {
    if (this.socket?.connected) {
      // On passe le callback à la méthode native de Socket.io
      this.socket.emit(event, data, callback);
      
    } else {
      console.warn('⚠️ Socket non connecté, mise en file d\'attente...');
      this.socket?.once('connect', () => {
        this.socket?.emit(event, data, callback);
      });
    }
  }

  on<T>(event: string, callback: (data: T) => void): void {
    this.socket?.on(event, (data: T) => {
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