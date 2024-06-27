import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DateUtils } from '../../../../utils/date.utils';
import { GetStoreLayoutUsecase } from '../../../store/usecase/get-store-layout.usecase';
import { StoreLayout } from '../../../store/types/store-layout';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.scss',
  host: {ngSkipHydration: 'true'}
})
export class LoginViewComponent implements OnInit {
  public formGroup!: FormGroup;
  public loading: boolean = false;
  public invalidAccess: boolean = false;
  public invalidMessage: string = 'Confira seu email e senha';

  public dateUtils = new DateUtils();

  public layout: StoreLayout;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly getStoreLayoutUsecase: GetStoreLayoutUsecase
  ) {}

  ngOnInit(): void {
    this.getStoreLayoutUsecase.store_layout.subscribe(() => {
      this.layout = this.getStoreLayoutUsecase.getStoreLayout();
    });
    
    this.formGroup = this.formBuilder.group({
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.email,
      ]),
      password: this.formBuilder.control('', [Validators.required]),
    });
  }
}
