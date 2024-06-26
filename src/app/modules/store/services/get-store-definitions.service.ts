import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { StoreLayout } from '../types/store-layout';

@Injectable({
  providedIn: 'root',
})
export class GetStoreDefinitionsService {
  private endpoint = environment.endpoint;

  constructor(
    private readonly http: HttpClient,
    private readonly cookie: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async getStoreLayout(): Promise<StoreLayout> {
    return;
  }
}
