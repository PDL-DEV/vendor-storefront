import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesJourneyCartComponent } from './sales-journey-cart.component';

describe('SalesJourneyCartComponent', () => {
  let component: SalesJourneyCartComponent;
  let fixture: ComponentFixture<SalesJourneyCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesJourneyCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesJourneyCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
