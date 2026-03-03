import { Component, ElementRef, ViewChild, inject, effect, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../core/services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [FormsModule],
})
export class ChatbotComponent {
  public chatbotService = inject(ChatbotService); // Public pour accéder aux signals dans le HTML

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  isOpen = false;
  userInput = '';

  constructor() {
    // Auto-scroll vers le bas à chaque nouveau message
    effect(() => {
      // On "écoute" le signal messages()
      this.chatbotService.messages();
      
      // On scroll après le rendu du DOM
      setTimeout(() => this.scrollToBottom(), 100);
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    this.chatbotService.sendMessage(this.userInput);
    this.userInput = ''; // Vider l'input
  }

  private scrollToBottom() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }
}