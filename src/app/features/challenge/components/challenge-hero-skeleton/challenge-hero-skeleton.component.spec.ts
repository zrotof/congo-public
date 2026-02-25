import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeHeroSkeletonComponent } from './challenge-hero-skeleton.component';

describe('ChallengeHeroSkeletonComponent', () => {
  let component: ChallengeHeroSkeletonComponent;
  let fixture: ComponentFixture<ChallengeHeroSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeHeroSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeHeroSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
