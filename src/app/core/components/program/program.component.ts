import { NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrl: './program.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [
    NgOptimizedImage
  ]
})

export class ProgramComponent {
  
  @Output() closeEventTrigger = new EventEmitter<boolean>();

  onCloseButtonClicked(): void {
    this.closeEventTrigger.emit(true);
  }
}
