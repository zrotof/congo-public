import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeHeroComponent } from './challenge-hero.component';

describe('ChallengeHeroComponent', () => {
  let component: ChallengeHeroComponent;
  let fixture: ComponentFixture<ChallengeHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
