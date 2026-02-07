import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SnapFilter } from '../../../../core/models/snapfilter.model';

@Component({
  selector: 'app-snapfilter-section',
  standalone: true,
  templateUrl: './snapfilter-section.component.html',
  styleUrls: ['./snapfilter-section.component.scss'],
  imports: [
    CommonModule,
    NgOptimizedImage
  ]
})

export class SnapFilterSectionComponent implements OnChanges {
  @Input() filters: SnapFilter[] = [];
  @Input() totalUsage: number = 0;
  @Input() isLoading: boolean = false;

  @Output() filterClick = new EventEmitter<SnapFilter>();

  // Listes séparées
  tiktokFilters: SnapFilter[] = [];
  snapchatFilters: SnapFilter[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters'] && this.filters) {
      this.categorizeFilters();
    }
  }

  private categorizeFilters(): void {
    // On trie par plateforme
    this.tiktokFilters = this.filters.filter(f => f.platform === 'TIKTOK');
    this.snapchatFilters = this.filters.filter(f => !f.platform || f.platform === 'SNAPCHAT'); // Fallback Snapchat
  }

  onFilterClick(filter: SnapFilter): void {
    this.filterClick.emit(filter);
  }

  trackByFilterId(index: number, filter: SnapFilter): number {
    return filter.id;
  }
}