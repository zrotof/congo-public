import { NgOptimizedImage } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ChallengeService } from '../../../../core/services/challenge.service';

@Component({
  selector: 'app-challenge-hero',
  templateUrl: './challenge-hero.component.html',
  styleUrl: './challenge-hero.component.scss',
  imports: [
    NgOptimizedImage
  ]
})

export class ChallengeHeroComponent {
  imageUrl = input.required<string>();
    isRevealed = input.required<boolean>();

}
