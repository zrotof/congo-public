import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigFilesHeroComponent } from './big-files-hero.component';

describe('BigFilesHeroComponent', () => {
  let component: BigFilesHeroComponent;
  let fixture: ComponentFixture<BigFilesHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigFilesHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigFilesHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
