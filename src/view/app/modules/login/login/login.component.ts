import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateUtils } from '../../../../../utils/date.utils';
import { Router } from '@angular/router';
import { StoreModel } from '../../../../../core/models/store.model';
import { GetCurrentStoreUsecase } from '../../../../../core/usecases/get-current-store.usecase';
import { UserLoginUsecase } from '../../../../../core/usecases/user-login.usecase';
import { SetCurrentAccessTokenUsecase } from '../../../../../core/usecases/set-current-access-token.usecase';
import { GetUserProfileUsecase } from '../../../../../core/usecases/get-user-profile.usecase';
import { SetCurrentUserUsecase } from '../../../../../core/usecases/set-current-user.usecase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup;
  public loading: boolean = false;
  public invalidAccess: boolean = false;
  public invalidMessage: string = 'Confira seu email e senha';

  public dateUtils = new DateUtils();

  public store: StoreModel;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly getCurrentStoreUC: GetCurrentStoreUsecase,
    private readonly userLoginUC: UserLoginUsecase,
    private readonly setAccessTokenUC: SetCurrentAccessTokenUsecase,
    private readonly getUserProfileUC: GetUserProfileUsecase,
    private readonly setUserProfileUC: SetCurrentUserUsecase
  ) {}

  ngOnInit(): void {
    this.getCurrentStoreUC.execute().subscribe((store) => {
      this.store = store;
    });

    this.formGroup = this.formBuilder.group({
      username: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required]),
    });
  }

  async login(): Promise<void> {
    if (!this.formGroup.valid) {
      this.invalidAccess = true;
      this.invalidMessage = 'Insira seu email e senha para continuar';
      return;
    }

    this.invalidAccess = false;
    this.loading = true;

    this.userLoginUC.execute(this.formGroup.value).subscribe({
      next: async (token) => {
        await this.setAccessTokenUC.set(token);

        this.getUserProfileUC.execute().subscribe({
          next: (userProfile) => {
            this.setUserProfileUC.set(userProfile);
            this.loading = false;
            this.router.navigate(['/']);
          },
          error: (e) => {
            this.invalidAccess = true;
            this.loading = false;
          },
        });
      },
      error: (e) => {
        this.invalidAccess = true;
        this.loading = false;
      },
    });
  }
}
