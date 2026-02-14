import { Component, Input, OnChanges, SimpleChanges, computed, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-global-counter',
  standalone: true,
  templateUrl: './global-counter.component.html',
  styleUrls: ['./global-counter.component.scss'],
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLink
]
})

export class GlobalCounterComponent implements OnChanges {
  @Input({ required: true }) count: number = 0;

  displayCount = signal<number>(0);

  digitsGroups = computed(() => {
    const num = this.displayCount();
    const padded = num.toString().padStart(9, '0');
    return [
      padded.slice(0, 3), // Millions
      padded.slice(3, 6), // Milliers
      padded.slice(6, 9)  // Unités
    ];
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['count']) {
      this.animateCount(changes['count'].currentValue);
    }
  }

  private animateCount(target: number) {
    // ... (Même logique d'animation que précédemment)
    const start = this.displayCount();
    const duration = Math.abs(target - start) > 100 ? 2000 : 500;
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      const current = Math.floor(start + (target - start) * ease);
      this.displayCount.set(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        this.displayCount.set(target);
      }
    };
    requestAnimationFrame(update);
  }
}