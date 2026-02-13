import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigFilesEnvironmentComponent } from './big-files-environment.component';

describe('BigFilesEnvironmentComponent', () => {
  let component: BigFilesEnvironmentComponent;
  let fixture: ComponentFixture<BigFilesEnvironmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigFilesEnvironmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigFilesEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
