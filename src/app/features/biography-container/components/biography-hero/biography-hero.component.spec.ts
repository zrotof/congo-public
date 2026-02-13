import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiographyHeroComponent } from './biography-hero.component';

describe('BiographyHeroComponent', () => {
  let component: BiographyHeroComponent;
  let fixture: ComponentFixture<BiographyHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiographyHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiographyHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
