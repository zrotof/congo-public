import { Component, inject } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ChallengeComponent } from './features/challenge/challenge.component';
import { HeaderComponent } from "./core/components/header/header.component";
import { ChallengeService } from './core/services/challenge.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    HeaderComponent,
    ChallengeComponent,
    ToastModule,
],
})
export class AppComponent {

  private challengeService = inject(ChallengeService);

  ngOnInit(){
    //this.challengeService.sendClick();
  }
}
