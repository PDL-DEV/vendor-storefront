import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesJourneyTopbarComponent } from './sales-journey-topbar.component';

describe('SalesJourneyTopbarComponent', () => {
  let component: SalesJourneyTopbarComponent;
  let fixture: ComponentFixture<SalesJourneyTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesJourneyTopbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesJourneyTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
