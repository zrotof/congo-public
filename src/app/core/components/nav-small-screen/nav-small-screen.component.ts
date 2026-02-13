import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-small-screen',
  templateUrl: './nav-small-screen.component.html',
  styleUrls: ['./nav-small-screen.component.scss'],
  imports: [
    RouterLinkActive,
    RouterLink
  ]
})

export class NavSmallScreenComponent {

  @Output() onNavigationOnSmallScreenEvent = new EventEmitter<boolean>();

  onNavigationClicked() {
    this.onNavigationOnSmallScreenEvent.emit(false);
  }

}
