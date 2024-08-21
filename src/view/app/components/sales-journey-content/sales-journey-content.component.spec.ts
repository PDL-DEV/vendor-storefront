import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesJourneyContentComponent } from './sales-journey-content.component';

describe('SalesJourneyContentComponent', () => {
  let component: SalesJourneyContentComponent;
  let fixture: ComponentFixture<SalesJourneyContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesJourneyContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesJourneyContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
