import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AppEnv } from '../../../enum/app-env.enum';
import { HttpService } from '../../../services/http.service';
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class AccountAuthService extends HttpService {
  private endpoint = environment.endpoint;

  constructor(private readonly http: HttpClient) {
    super();
  }

  async auth(payload: AuthDto): Promise<any> {
    const headers = await this.getHeaders();

    return new Promise((resolve, reject) => {
      this.http
        .post<any>(`${this.endpoint}/vendors/auth`, payload, {
          headers: headers,
        })
        .subscribe((user) => {
          resolve(user);
        });
    });
  }
}
