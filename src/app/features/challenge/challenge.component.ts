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

export default class ChallengeComponent implements OnInit {
  private challengeService = inject(ChallengeService);
  private filterService = inject(FilterService);
  private globalStatsService = inject(GlobalStatsService);


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
  filters = this.filterService.filters;
  totalFilterUsage = this.filterService.totalUsage;
  filtersLoading = this.filterService.isLoading;

  ngOnInit(): void {
    this.filterService.loadFilters();
  }

  onFilterClick(filter: SnapFilter): void {
    // 1. Incrémenter le compteur via Socket
    this.filterService.useFilter(filter.id);

    // 2. Ouvrir le lien Snapchat
    if (filter.filterUrl) {
      window.open(filter.filterUrl, '_blank');
    }
  }
}