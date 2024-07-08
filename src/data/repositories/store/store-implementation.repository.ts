import { Injectable } from '@angular/core';
import { StoreRepository } from '../../../core/repositories/store.repository';
import { HttpClient } from '@angular/common/http';
import { RequestHeaders } from '../../../base/request-headers';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { StoreModel } from '../../../core/models/store.model';
import { StoreImplementationRepositoryMapper } from './mappers/store-repository.mapper';
import { StoreEntity } from './entities/store.entity';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';
import { StoreCookiesKeys } from '../../../enums/store-cookies-keys.enum';
import { HttpUtils } from '../../../utils/http.utils';
import { DateUtils } from '../../../utils/date.utils';
import { DateMinutes } from '../../../enums/date-minutes.enum';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class StoreImplementationRepository extends StoreRepository {
  private storeMapper = new StoreImplementationRepositoryMapper();
  store: BehaviorSubject<StoreModel>;

  constructor(
    private readonly http: HttpClient,
    private readonly requestHeaders: RequestHeaders,
    private readonly cookie: CookieService
  ) {
    super();
    this.store = new BehaviorSubject<StoreModel>(this.getCurrentStore());
  }

  override getStore(): Observable<StoreModel> {
    return this.http
      .get<StoreEntity>(`${environment.endpoint}/store/layout`, {
        headers: this.requestHeaders.getHeaders(),
      })
      .pipe(map(this.storeMapper.mapFrom));
  }

  private getCurrentStore(): StoreModel {
    const store = this.cookie.get(StoreCookiesKeys.STORE);

    if (!store) {
      return null;
    }

    try {
      let decryp, curentStore: StoreModel;
      decryp = CryptoJS.AES.decrypt(store, StoreCookiesKeys.STORE);
      curentStore = JSON.parse(decryp.toString(CryptoJS.enc.Utf8)); // DECRYP 2

      if (typeof curentStore == 'string') {
        curentStore = JSON.parse(curentStore);
      }

      return curentStore;
    } catch (error) {
      return null;
    }
  }

  override currentStore(): Observable<StoreModel> {
    return this.store;
  }

  override setCurrentStore(params: StoreModel): void {
    const encryp = CryptoJS.AES.encrypt(
      JSON.stringify(JSON.stringify(params)),
      StoreCookiesKeys.STORE
    ).toString();

    const hostname = HttpUtils.getHostnameWithoutWWW();
    const date = DateUtils.getDateInFuture(DateMinutes['24_HOUR']);

    this.cookie.set(
      StoreCookiesKeys.STORE,
      encryp,
      date,
      '/',
      hostname,
      HttpUtils.isSecureProtocol(),
      'Lax'
    );

    this.store.next(params);
  }
}
