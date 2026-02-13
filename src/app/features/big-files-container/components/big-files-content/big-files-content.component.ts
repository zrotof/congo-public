import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-big-files-content',
  templateUrl: './big-files-content.component.html',
  styleUrl: './big-files-content.component.scss',
  imports: [
    NgOptimizedImage
  ]
})

export class BigFilesContentComponent {
  data = input.required<any>();
}
