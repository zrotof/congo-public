import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigFilesContentComponent } from './big-files-content.component';

describe('BigFilesContentComponent', () => {
  let component: BigFilesContentComponent;
  let fixture: ComponentFixture<BigFilesContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigFilesContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigFilesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
