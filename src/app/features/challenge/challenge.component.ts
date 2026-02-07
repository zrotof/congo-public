import { Component, OnInit, OnDestroy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeService } from '../../core/services/challenge.service';
import { ChallengeHeroComponent } from './components/challenge-hero/challenge-hero.component';
import { SnapFilter } from '../../core/models/snapfilter.model';
import { AboutCandidateComponent } from "./components/about-candidate/about-candidate.component";
import { GlobalCounterComponent } from './components/global-counter/global-counter.component';
import { GlobalStatsService } from '../../core/services/global-stats.service';
import { FilterService } from '../../core/services/filter.service';

import { SnapFilterSectionComponent } from './components/snapfilter-section/snapfilter-section.component';

@Component({
  selector: 'app-challenge',
  standalone: true,
  imports: [
    CommonModule,
    ChallengeHeroComponent,
    GlobalCounterComponent,
    AboutCandidateComponent,
    SnapFilterSectionComponent
  ],
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})

export class ChallengeComponent implements OnInit, OnDestroy {
  private challengeService = inject(ChallengeService);
  private snapFilterService = inject(FilterService);
  private globalStatsService = inject(GlobalStatsService);
  private filterService = inject(FilterService);


  challenge = this.challengeService.challenge;
  imageUrl = this.challengeService.imageUrl;
  currentViews = this.challengeService.currentViews;
  isRevealed = this.challengeService.isRevealed;
  isLoading = this.challengeService.isLoading;
  error = this.challengeService.error;
  isConnected = this.challengeService.isConnected;

  // ✅ Ce signal contient la valeur à passer
  totalVisits = this.globalStatsService.totalVisits;

  // Filters signals
// Filtres (Snapchat/TikTok) ✅
  filters = this.snapFilterService.filters;
  totalFilterUsage = this.snapFilterService.totalUsage;
  filtersLoading = this.snapFilterService.isLoading;

  ngOnInit(): void {
    this.challengeService.loadChallenge();
    this.snapFilterService.loadFilters();
    this.globalStatsService.init();
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
    if (filter.filterUrl) {
      window.open(filter.filterUrl, '_blank');
    }
  }
}