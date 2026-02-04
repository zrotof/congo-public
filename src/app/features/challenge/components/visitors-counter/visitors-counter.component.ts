import { Component, Input, signal, effect, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visitor-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visitors-counter.component.html',
  styleUrl: './visitors-counter.component.scss'
})
export class VisitorsCounterComponent implements OnChanges {
  @Input({ required: true }) count: number = 0;
  
  // Signal pour l'affichage animé
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