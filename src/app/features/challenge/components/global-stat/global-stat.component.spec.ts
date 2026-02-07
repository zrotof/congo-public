import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalStatComponent } from './global-stat.component';

describe('GlobalStatComponent', () => {
  let component: GlobalStatComponent;
  let fixture: ComponentFixture<GlobalStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalStatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
