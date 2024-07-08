import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { inject, Injectable } from '@angular/core';
import { AppEnv } from '../enums/app-env.enum';
import { GetCurrentAccessTokenUsecase } from '../core/usecases/get-current-access-token.usecase';

@Injectable()
export class RequestHeaders {
  constructor(
    private readonly getCurrentAccessTokenCaseUC: GetCurrentAccessTokenUsecase
  ) {}
  getHeaders(): HttpHeaders {
    let headers: any = {
      'Content-Type': 'application/json',
    };

    if (environment.env === AppEnv.DEV) {
      headers['StoreDomain'] = environment.store_development;
    }

    const accessToken = this.getCurrentAccessTokenCaseUC.get();

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken.Token}`;
    }

    return new HttpHeaders(headers);
  }
}
