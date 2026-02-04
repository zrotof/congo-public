import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnapFilter } from '../../../../core/models/snapfilter.model';

@Component({
  selector: 'app-snapfilter-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snapfilter-section.component.html',
  styleUrls: ['./snapfilter-section.component.scss']
})
export class SnapFilterSectionComponent {
  @Input() filters: SnapFilter[] = [];
  @Input() totalUsage: number = 0;
  @Input() isLoading: boolean = false;

  @Output() filterClick = new EventEmitter<SnapFilter>();

  onFilterClick(filter: SnapFilter): void {
    this.filterClick.emit(filter);
  }

  trackByFilterId(index: number, filter: SnapFilter): number {
    return filter.id;
  }
}