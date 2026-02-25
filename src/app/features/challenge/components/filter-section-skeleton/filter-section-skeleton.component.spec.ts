import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSectionSkeletonComponent } from './filter-section-skeleton.component';

describe('FilterSectionSkeletonComponent', () => {
  let component: FilterSectionSkeletonComponent;
  let fixture: ComponentFixture<FilterSectionSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterSectionSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterSectionSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
