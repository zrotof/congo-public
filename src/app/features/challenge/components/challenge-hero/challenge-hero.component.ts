import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { Component, inject, input, signal, SimpleChanges } from '@angular/core';
import { ChallengeService } from '../../../../core/services/challenge.service';

@Component({
  selector: 'app-challenge-hero',
  templateUrl: './challenge-hero.component.html',
  styleUrl: './challenge-hero.component.scss',
  imports: [
    NgOptimizedImage,
    DecimalPipe
  ]
})

export class ChallengeHeroComponent {
  imageUrl = input.required<string>();
  isRevealed = input.required<boolean>();
  count = input.required<number>();

  displayCount = signal<number>(0);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['count']) {
      this.animateCount(changes['count'].currentValue);
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
