import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutBaseComponent } from './components/layout-base/layout-base.component';
import { LoginRoutingModule } from './pages/login/login-routing.module';
import { verifySessionGuard } from '../guard/verify-session.guard';
import { SalesJourneyRoutingModule } from './pages/sales-journey/sales-journey-routing.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutBaseComponent,
   canActivate: [verifySessionGuard],
    children: [
      
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),    
    LoginRoutingModule,
    SalesJourneyRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
