import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesJourneyRoutingModule } from './sales-journey-routing.module';
import { SalesJourneyCustomerComponent } from './sales-journey-customer/sales-journey-customer.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { SalesJourneyCartComponent } from './sales-journey-cart/sales-journey-cart.component';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    SalesJourneyCustomerComponent,
    SalesJourneyCartComponent
  ],
  imports: [    
    CommonModule,
    SalesJourneyRoutingModule,
    MatButtonToggleModule,
    ComponentsModule
  ]
})
export class SalesJourneyModule { }
