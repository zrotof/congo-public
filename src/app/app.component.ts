import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from "./core/components/header/header.component";
import { FooterComponent } from "./core/components/footer/footer.component";
import { LaunchAdviceComponent } from './core/components/launch-advice/launch-advice.component';
import { ChallengeService } from './core/services/challenge.service';
import { ToastModule } from 'primeng/toast';
import { RouterOutlet } from '@angular/router';
import { FilterService } from './core/services/filter.service';
import { GlobalStatsService } from './core/services/global-stats.service';
import { ChatbotComponent } from './features/chatbot/chatbot.component';
import { SocketService } from './core/services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    ToastModule,
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    LaunchAdviceComponent,
    ChatbotComponent
  ]
})

export class AppComponent {
  private socketService = inject(SocketService);
  private challengeService = inject(ChallengeService);
  private filterService = inject(FilterService);
  private globalStatsService = inject(GlobalStatsService);

  displayWelcome: boolean = false;
  displayPage: boolean = false;

  protected isBrowser = isPlatformBrowser(inject(PLATFORM_ID))

  ngOnInit() {    
    if (this.isBrowser) {
      // 1. D'abord, on lance la connexion Socket UNIQUE
      this.socketService.connect();

      // Utilise la même clé partout
      const hasVisited = localStorage.getItem('already_visited');

      if (!hasVisited) {
        this.displayPage = false;
        setTimeout(() => {
          this.displayWelcome = true;
        }, 1500);
      } else {
        this.displayWelcome = false;
        // Si déjà visité, on montre la page immédiatement
        this.displayPage = true;
      }

      this.challengeService.loadChallenge();
      this.globalStatsService.init();
    }
  }

  onAcceptEventTriggerHandler(event: boolean) {
    if (this.isBrowser) {
      localStorage.setItem('already_visited', 'true');
      this.displayWelcome = false;
      this.displayPage = true;
    }
  }

  ngOnDestroy(): void {
    this.challengeService.leaveChallenge();
    this.challengeService.cleanup();

    this.filterService.leaveFilters();
    this.filterService.cleanup();
  }
}
