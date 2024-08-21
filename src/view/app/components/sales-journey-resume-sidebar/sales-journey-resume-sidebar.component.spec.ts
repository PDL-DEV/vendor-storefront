import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesJourneyResumeSidebarComponent } from './sales-journey-resume-sidebar.component';

describe('SalesJourneyResumeSidebarComponent', () => {
  let component: SalesJourneyResumeSidebarComponent;
  let fixture: ComponentFixture<SalesJourneyResumeSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesJourneyResumeSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesJourneyResumeSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
