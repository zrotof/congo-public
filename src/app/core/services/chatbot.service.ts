import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ChatMessage {
  text: string;
  isUser: boolean;
  date: Date;
  isLoading?: boolean;
}

export interface ChatResponse {
  response: string;
  sources?: string[];
}

@Injectable({
  providedIn: 'root'
})

export class ChatbotService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/chat`; // Assure-toi que cette route existe

  messages = signal<ChatMessage[]>([
    {
      text: "Bonjour ! 👋 Je suis l'assistant virtuel du candidat Denis Sassou N'Guesso. Posez-moi une question sur le projet de société (Santé, Éducation, Routes...).",
      isUser: false,
      date: new Date()
    }
  ]);

  /**
   * Envoie un message au backend et gère la réponse
   */
  sendMessage(question: string): void {
    // 1. Ajouter le message de l'utilisateur
    this.addMessage({ text: question, isUser: true, date: new Date() });

    // 2. Ajouter un message temporaire de chargement du bot
    this.addMessage({ text: '', isUser: false, date: new Date(), isLoading: true });

    // 3. Appel API
    this.http.post<ChatResponse>(this.API_URL, { question }).pipe(
      catchError(err => {
        console.error('Erreur API Chat:', err);
        return of({ response: "Désolé, je rencontre un problème de connexion pour le moment. Veuillez réessayer plus tard." });
      })
    ).subscribe((res) => {
      // 4. Remplacer le message de chargement par la vraie réponse
      this.updateLastBotMessage(res.response);
    });
  }

  /**
   * Ajoute un message à la liste
   */
  private addMessage(msg: ChatMessage) {
    this.messages.update(current => [...current, msg]);
  }

  /**
   * Met à jour le dernier message (pour enlever le loading)
   */
  private updateLastBotMessage(responseText: string) {
    this.messages.update(current => {
      const newList = [...current];
      const lastIndex = newList.length - 1;
      
      if (lastIndex >= 0 && !newList[lastIndex].isUser) {
        newList[lastIndex] = {
          ...newList[lastIndex],
          text: responseText,
          isLoading: false
        };
      }
      return newList;
    });
  }
}