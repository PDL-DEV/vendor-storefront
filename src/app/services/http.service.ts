import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AppEnv } from '../enum/app-env.enum';

export abstract class HttpService {
  async getHeaders(): Promise<HttpHeaders> {
    let headers: any = {
      'Content-Type': 'application/json',
    };

    if (environment.env === AppEnv.DEV) {
      headers['StoreDomain'] = environment.store_development;
    }

    return new HttpHeaders(headers);
  }
}
