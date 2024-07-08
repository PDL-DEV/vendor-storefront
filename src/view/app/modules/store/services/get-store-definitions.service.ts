import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { StoreLayout } from '../types/store-layout';
import { BehaviorSubject } from 'rxjs';
import { AppEnv } from '../../../enum/app-env.enum';
import { HttpService } from '../../../services/http.service';
import { AuthenticateUserUsecase } from '../../account/usecase/authenticate-user.usecase';

@Injectable({
  providedIn: 'root',
})
export class GetStoreDefinitionsService extends HttpService {
  private endpoint = environment.endpoint;

  constructor(
    private readonly http: HttpClient,
    private readonly AuthenticateUserUsecase: AuthenticateUserUsecase
  ) {
    super(AuthenticateUserUsecase);
  }

  async getStoreLayout(): Promise<StoreLayout> {
    const headers = await this.getHeaders();
    
    return new Promise((resolve, reject) => {
      this.http
        .get<StoreLayout>(`${this.endpoint}/store/layout`, { headers: headers })
        .subscribe((layout) => {
          resolve(layout);
        });
    });
  }
}
