import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalCounterSkeletonComponent } from './global-counter-skeleton.component';

describe('GlobalCounterSkeletonComponent', () => {
  let component: GlobalCounterSkeletonComponent;
  let fixture: ComponentFixture<GlobalCounterSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalCounterSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalCounterSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
