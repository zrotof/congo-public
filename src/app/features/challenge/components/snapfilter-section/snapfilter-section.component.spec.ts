import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapfilterSectionComponent } from './snapfilter-section.component';

describe('SnapfilterSectionComponent', () => {
  let component: SnapfilterSectionComponent;
  let fixture: ComponentFixture<SnapfilterSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnapfilterSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnapfilterSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
