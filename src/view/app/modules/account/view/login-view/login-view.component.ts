import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DateUtils } from '../../../../utils/date.utils';
import { GetStoreLayoutUsecase } from '../../../store/usecase/get-store-layout.usecase';
import { StoreLayout } from '../../../store/types/store-layout';
import { AccountAuthService } from '../../services/account-auth.service';
import { AuthenticateUserUsecase } from '../../usecase/authenticate-user.usecase';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class LoginViewComponent implements OnInit {
  public formGroup: FormGroup;
  public loading: boolean = false;
  public invalidAccess: boolean = false;
  public invalidMessage: string = 'Confira seu email e senha';

  public dateUtils = new DateUtils();

  public layout: StoreLayout;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly getStoreLayoutUsecase: GetStoreLayoutUsecase,
    private readonly authService: AccountAuthService,
    private readonly authenticateUsecase: AuthenticateUserUsecase
  ) {}

  ngOnInit(): void {
    this.getStoreLayoutUsecase.store_layout.subscribe(() => {
      this.layout = this.getStoreLayoutUsecase.getStoreLayout();
    });

    this.formGroup = this.formBuilder.group({
      username: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required]),
    });
  }

  async auth(): Promise<void> {
    if (!this.formGroup.valid) {
      this.invalidAccess = true;
      this.invalidMessage = 'Insira seu email e senha para continuar';
      return;
    }

    this.invalidAccess = false;
    this.loading = true;

    const access_token = await this.authService.auth({
      username: this.formGroup.value.username,
      password: this.formGroup.value.password,
    });

    this.loading = false;

    if (!access_token) {
      this.invalidAccess = true;
      return;
    }

    await this.authenticateUsecase.setAccessToken(access_token);
    const user = await this.authService.getCurrentUser();
    await this.authenticateUsecase.setCurrentUser(user);

    await this.router.navigate(['/']);
  }
}
