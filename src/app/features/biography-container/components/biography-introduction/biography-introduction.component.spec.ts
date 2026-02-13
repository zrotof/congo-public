import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiographyIntroductionComponent } from './biography-introduction.component';

describe('BiographyIntroductionComponent', () => {
  let component: BiographyIntroductionComponent;
  let fixture: ComponentFixture<BiographyIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiographyIntroductionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiographyIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
