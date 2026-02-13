import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchAdviceComponent } from './launch-advice.component';

describe('LaunchAdviceComponent', () => {
  let component: LaunchAdviceComponent;
  let fixture: ComponentFixture<LaunchAdviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchAdviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaunchAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
