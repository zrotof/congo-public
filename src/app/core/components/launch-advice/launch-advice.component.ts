import { NgOptimizedImage } from '@angular/common';
import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-launch-advice',
  templateUrl: './launch-advice.component.html',
  styleUrl: './launch-advice.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [
    NgOptimizedImage,
    Dialog,
    ButtonModule
  ]
})

export class LaunchAdviceComponent {
  acceptEventTrigger = output<boolean>();

  onAccept() {
    this.acceptEventTrigger.emit(true);
  }
}
