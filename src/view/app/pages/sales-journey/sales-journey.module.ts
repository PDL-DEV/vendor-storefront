import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesJourneyRoutingModule } from './sales-journey-routing.module';
import { SalesJourneyCustomerComponent } from './sales-journey-customer/sales-journey-customer.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { SalesJourneyCartComponent } from './sales-journey-cart/sales-journey-cart.component';
import { ComponentsModule } from '../../components/components.module';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';



@NgModule({
  declarations: [
    SalesJourneyCustomerComponent,
    SalesJourneyCartComponent
  ],
  imports: [    
    CommonModule,
    SalesJourneyRoutingModule,
    MatButtonToggleModule,
    ComponentsModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class SalesJourneyModule { }
