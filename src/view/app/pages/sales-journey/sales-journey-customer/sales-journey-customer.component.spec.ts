import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesJourneyCustomerComponent } from './sales-journey-customer.component';

describe('SalesJourneyCustomerComponent', () => {
  let component: SalesJourneyCustomerComponent;
  let fixture: ComponentFixture<SalesJourneyCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesJourneyCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesJourneyCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
