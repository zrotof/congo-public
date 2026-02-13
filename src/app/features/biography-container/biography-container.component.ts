import { Component } from '@angular/core';
import { BiographyHeroComponent } from "./components/biography-hero/biography-hero.component";
import { BiographyComponent } from "./components/biography/biography.component";
import { BiographyIntroductionComponent } from './components/biography-introduction/biography-introduction.component';

@Component({
  selector: 'app-biography-container',
  templateUrl: './biography-container.component.html',
  styleUrl: './biography-container.component.scss',
  imports: [
    BiographyHeroComponent,
    BiographyIntroductionComponent,
    BiographyComponent
],
})

export default class BiographyContainerComponent {

}
