import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AppEnv } from '../enum/app-env.enum';
import { AuthenticateUserUsecase } from '../modules/account/usecase/authenticate-user.usecase';

export abstract class HttpService {
  constructor(
    private readonly authenticateUserUsecase: AuthenticateUserUsecase
  ) {}

  async getHeaders(): Promise<HttpHeaders> {
    let headers: any = {
      'Content-Type': 'application/json',
    };

    if (environment.env === AppEnv.DEV) {
      headers['StoreDomain'] = environment.store_development;
    }

    const access_token = await this.authenticateUserUsecase.getAccessToken();
    if (access_token) {
      headers['Authorization'] = await `Bearer ${access_token.Token}`;
    }

    return new HttpHeaders(headers);
  }
}
