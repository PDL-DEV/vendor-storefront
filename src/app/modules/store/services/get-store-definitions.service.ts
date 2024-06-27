import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { StoreLayout } from '../types/store-layout';
import { BehaviorSubject } from 'rxjs';
import { AppEnv } from '../../../enum/app-env.enum';

@Injectable({
  providedIn: 'root',
})
export class GetStoreDefinitionsService {
  private endpoint = environment.endpoint;

  constructor(private readonly http: HttpClient) {}

  async getStoreLayout(): Promise<StoreLayout> {
    let headers = {};

    if (environment.env === AppEnv.DEV) {
      headers = {
        StoreDomain: environment.store_development
      }
    }  
    
    return new Promise((resolve, reject) => {
      this.http
        .get<StoreLayout>(`${this.endpoint}/store/layout`, {headers: headers})
        .subscribe((layout) => {
          resolve(layout);
        });
    });
  }
}
