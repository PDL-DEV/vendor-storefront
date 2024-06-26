import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutBaseComponent } from './components/layout-base/layout-base.component';
import { AccountRoutingModule } from './modules/account/account-routing.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutBaseComponent,
    // canActivate: [verifySessionGuard],
    children: [
      
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AccountRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
