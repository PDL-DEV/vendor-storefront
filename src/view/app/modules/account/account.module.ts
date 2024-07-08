import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginViewComponent } from './view/login-view/login-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticateUserUsecase } from './usecase/authenticate-user.usecase';
import { AccountAuthService } from './services/account-auth.service';


@NgModule({
  declarations: [
    LoginViewComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthenticateUserUsecase,
    AccountAuthService
  ]
})
export class AccountModule { }
