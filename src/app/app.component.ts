import { Component, Inject, inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ChallengeComponent } from './features/challenge/challenge.component';
import { HeaderComponent } from "./core/components/header/header.component";
import { ChallengeService } from './core/services/challenge.service';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { FooterComponent } from "./core/components/footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [
    HeaderComponent,
    ChallengeComponent,
    ToastModule,
    Dialog,
    ButtonModule,
    NgOptimizedImage,
    FooterComponent
]
})

export class AppComponent {
  private challengeService = inject(ChallengeService);

  displayWelcome: boolean = false;
  displayPage: boolean = false;

  protected isBrowser = isPlatformBrowser(inject(PLATFORM_ID))

  ngOnInit() {
    if (this.isBrowser) {
      // Utilise la même clé partout
      const hasVisited = localStorage.getItem('already_visited');

      if (!hasVisited) {
        this.displayPage = false; // On cache la page au début
        setTimeout(() => {
          this.displayWelcome = true;
        }, 1500);
      } else {
        this.displayWelcome = true;
        // Si déjà visité, on montre la page immédiatement
        //this.displayPage = true;
      }
    }
  }

  onAccept() {
    if (this.isBrowser) {
      localStorage.setItem('already_visited', 'true');
      this.displayWelcome = false;
      this.displayPage = true;
    }
  }
}
