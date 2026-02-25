import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Component, inject, input, PLATFORM_ID, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-challenge-hero',
  templateUrl: './challenge-hero.component.html',
  styleUrl: './challenge-hero.component.scss',
  imports: [
    NgOptimizedImage,
  ]
})

export class ChallengeHeroComponent {
  imageUrl = input.required<string>();
  isRevealed = input.required<boolean>();
  count = input.required<number>();
  displayCount = signal<number>(0);

  private platformId = inject(PLATFORM_ID);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['count']) {
      // ✅ PROTECTION SSG : On ne lance l'animation que sur le navigateur
      if (isPlatformBrowser(this.platformId)) {
        this.animateCount(changes['count'].currentValue);
      } else {
        // Côté serveur (SSG), on affiche juste la valeur finale sans animation
        this.displayCount.set(changes['count'].currentValue);
      }
    }
  }


  private animateCount(target: number) {
    const start = this.displayCount();
    const duration = 2000; // 2 secondes d'animation
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function pour un effet fluide (easeOutQuad)
      const ease = progress * (2 - progress);
      const current = Math.floor(start + (target - start) * ease);

      this.displayCount.set(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }
}
