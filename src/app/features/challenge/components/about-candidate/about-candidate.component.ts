import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { NETWORKS } from '../../../../shared/constants/network.constant'
@Component({
  selector: 'app-about-candidate',
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './about-candidate.component.html',
  styleUrls: ['./about-candidate.component.scss']
})

export class AboutCandidateComponent {
  protected readonly networks = NETWORKS;
}