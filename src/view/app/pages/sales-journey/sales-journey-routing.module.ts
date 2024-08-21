import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesJourneyContentComponent } from '../../components/sales-journey-content/sales-journey-content.component';
import { SalesJourneyCustomerComponent } from './sales-journey-customer/sales-journey-customer.component';
import { verifySessionGuard } from '../../../guard/verify-session.guard';
import { SalesJourneyCartComponent } from './sales-journey-cart/sales-journey-cart.component';

const routes: Routes = [
  {
    path: 'sales-journey',
    component: SalesJourneyContentComponent,
    children: [
      {
        path: 'customer',
        component: SalesJourneyCustomerComponent,
      },
      {
        path: 'cart',
        component: SalesJourneyCartComponent,
      },
    ],
    canActivate: [verifySessionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesJourneyRoutingModule {}
