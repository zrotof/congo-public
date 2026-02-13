import { Component } from '@angular/core';
import { NETWORKS } from '../../../../shared/constants/network.constant'
@Component({
  selector: 'app-biography-introduction',
  templateUrl: './biography-introduction.component.html',
  styleUrl: './biography-introduction.component.scss'
})
export class BiographyIntroductionComponent {
  protected readonly networks = NETWORKS;
}
