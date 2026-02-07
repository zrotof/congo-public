import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalCounterComponent } from './global-counter.component';

describe('GlobalCounterComponent', () => {
  let component: GlobalCounterComponent;
  let fixture: ComponentFixture<GlobalCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
