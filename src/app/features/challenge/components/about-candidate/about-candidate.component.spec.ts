import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCandidateComponent } from './about-candidate.component';

describe('AboutCandidateComponent', () => {
  let component: AboutCandidateComponent;
  let fixture: ComponentFixture<AboutCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutCandidateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
