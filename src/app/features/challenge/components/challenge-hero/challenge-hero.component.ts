import { DecimalPipe, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Component, inject, input, PLATFORM_ID, signal, computed, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-challenge-hero',
  templateUrl: './challenge-hero.component.html',
  styleUrl: './challenge-hero.component.scss',
  imports: [
    NgOptimizedImage,
    DecimalPipe
  ]
})
export class ChallengeHeroComponent implements OnChanges {
  // Inputs
  imageUrl = input.required<string>();
  isRevealed = input.required<boolean>();
  currentViews = input.required<number>();  
  progress = input<number>(0); // Objectif final

  // Signals animés pour l'affichage
  displayCount = signal<number>(0);
  displayProgress = signal<number>(0); // ✅ Nouveau signal animé

  // ✅ Calcul du stroke basé sur le signal ANIMÉ (displayProgress)
  strokeDashoffset = computed(() => {
    const circumference = 113; // 2 * PI * 18
    const p = this.displayProgress(); 
    return circumference - (p / 100) * circumference;
  });

  private platformId = inject(PLATFORM_ID);

  ngOnChanges(changes: SimpleChanges) {
    const isBrowser = isPlatformBrowser(this.platformId);

    // Animation du Compteur (Vues)
    if (changes['currentViews']) {
      const target = changes['currentViews'].currentValue;
      if (isBrowser) {
        this.animateValue(this.displayCount, target);
      } else {
        this.displayCount.set(target);
      }
    }

    // Animation du Pourcentage (Loader)
    if (changes['progress']) {
      const target = changes['progress'].currentValue;
      if (isBrowser) {
        this.animateValue(this.displayProgress, target);
      } else {
        this.displayProgress.set(target);
      }
    }
  }

  /**
   * Fonction générique d'animation
   */
  private animateValue(signalToUpdate: any, target: number) {
    const start = signalToUpdate();
    const duration = 2000;
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressTime = Math.min(elapsed / duration, 1);
      
      // Ease Out Quad
      const ease = progressTime * (2 - progressTime);
      
      // Calcul de la valeur courante (avec décimales pour le progress si besoin, sinon floor)
      const current = start + (target - start) * ease;

      // On met à jour le signal
      // Pour le compteur on veut des entiers, pour le progress on peut garder des décimales pour la fluidité du cercle
      signalToUpdate.set(signalToUpdate === this.displayCount ? Math.floor(current) : current);

      if (progressTime < 1) {
        requestAnimationFrame(update);
      } else {
        // Assurer la valeur finale exacte
        signalToUpdate.set(target);
      }
    };

    requestAnimationFrame(update);
  }
}