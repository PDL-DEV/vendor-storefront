import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AppEnv } from '../../../enum/app-env.enum';
import { HttpService } from '../../../services/http.service';
import { AuthDto } from '../dto/auth.dto';
import { AuthType } from '../types/auth.type';
import { VendorType } from '../types/vendor.type';
import { AuthenticateUserUsecase } from '../usecase/authenticate-user.usecase';

@Injectable()
export class AccountAuthService extends HttpService {
  private endpoint = environment.endpoint;

  constructor(
    private readonly http: HttpClient,
    private readonly AuthenticateUserUsecase: AuthenticateUserUsecase
  ) {
    super(AuthenticateUserUsecase);
  }

  async auth(payload: AuthDto): Promise<AuthType> {
    const headers = await this.getHeaders();

    return new Promise(async (resolve, reject) => {
      this.http
        .post<AuthType>(`${this.endpoint}/auth`, payload, {
          headers: headers,
        })
        .subscribe({
          next: (user) => {
            resolve(user);
          },
          error: (e) => {
            resolve(null);
          },
        });
    });
  }

  async getCurrentUser(): Promise<VendorType> {
    const headers = await this.getHeaders();

    return new Promise(async (resolve, reject) => {
      this.http
        .get<VendorType>(`${this.endpoint}/auth`, {
          headers: headers,
        })
        .subscribe({
          next: (user) => {
            resolve(user);
          },
          error: (e) => {
            resolve(null);
          },
        });
    });
  }
}
