import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { SnapFilter } from '../../../../core/models/snapfilter.model';

@Component({
  selector: 'app-filter-section',
  standalone: true,
  templateUrl: './filter-section.component.html',
  styleUrls: ['./filter-section.component.scss'],
  imports: [
    NgOptimizedImage,
    DecimalPipe
  ]
})

export class FilterSectionComponent implements OnChanges {
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