import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutBaseComponent } from './components/layout-base/layout-base.component';
import { LoginRoutingModule } from './modules/login/login-routing.module';
import { verifySessionGuard } from '../guard/verify-session.guard';

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
    LoginRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
