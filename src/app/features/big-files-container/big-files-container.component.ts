import { Component } from '@angular/core';
import { BigFilesHeroComponent } from './components/big-files-hero/big-files-hero.component';
import { BigFilesContentComponent } from './components/big-files-content/big-files-content.component';
import { HEALTH_DATA } from '../../shared/constants/health.constant'
import { ENVIRONMENT_DATA } from '../../shared/constants/environment.constant'

@Component({
  selector: 'app-big-files-container',
  templateUrl: './big-files-container.component.html',
  styleUrl: './big-files-container.component.scss',
  imports: [
    BigFilesHeroComponent,
    BigFilesContentComponent
  ]
})

export default class BigFilesContainerComponent {
  protected readonly peaceData = HEALTH_DATA ;
  protected readonly environmentData = ENVIRONMENT_DATA ;
}
