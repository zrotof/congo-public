import { Component, OnInit, OnDestroy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeService } from '../../core/services/challenge.service';
import { ChallengeHeroComponent } from './components/challenge-hero/challenge-hero.component';
import { VisitorsCounterComponent } from './components/visitors-counter/visitors-counter.component';
import { SnapFilterSectionComponent } from './components/snapfilter-section/snapfilter-section.component';
import { SnapFilterService } from '../../core/services/snapfilter.service';
import { SnapFilter } from '../../core/models/snapfilter.model';
import { AboutCandidateComponent } from "./components/about-candidate/about-candidate.component";

@Component({
  selector: 'app-challenge',
  standalone: true,
  imports: [
    CommonModule,
    ChallengeHeroComponent,
    VisitorsCounterComponent,
    AboutCandidateComponent,
    SnapFilterSectionComponent
],
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})

export class ChallengeComponent implements OnInit, OnDestroy {
  private challengeService = inject(ChallengeService);
  private snapFilterService = inject(SnapFilterService);

  challenge = this.challengeService.challenge;
  imageUrl = this.challengeService.imageUrl;
  currentViews = this.challengeService.currentViews;
  isRevealed = this.challengeService.isRevealed;
  isLoading = this.challengeService.isLoading;
  error = this.challengeService.error;
  isConnected = this.challengeService.isConnected;

    // Filters signals
  filters = this.snapFilterService.filters;
  totalUsage = this.snapFilterService.totalUsage;
  filtersLoading = this.snapFilterService.isLoading;

  ngOnInit(): void {
    this.challengeService.loadChallenge();
    this.snapFilterService.loadFilters();

  }

  ngOnDestroy(): void {
    this.challengeService.leaveChallenge();
    this.challengeService.cleanup();

    this.snapFilterService.leaveFilters();
    this.snapFilterService.cleanup();
  }

  onFilterClick(filter: SnapFilter): void {
    // 1. Incrémenter le compteur via Socket
    this.snapFilterService.useFilter(filter.id);

    // 2. Ouvrir le lien Snapchat
    if (filter.snapchatUrl) {
      window.open(filter.snapchatUrl, '_blank');
    }
  }
}