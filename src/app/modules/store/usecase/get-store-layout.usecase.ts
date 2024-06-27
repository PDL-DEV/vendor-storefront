import { Injectable } from '@angular/core';
import { GetStoreDefinitionsService } from '../services/get-store-definitions.service';
import { StoreLayout } from '../types/store-layout';
import { CookieService } from 'ngx-cookie-service';
import { StoreCookiesKeys } from '../enum/store-cookies-keys.enum';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject } from 'rxjs';
import { HttpUtils } from '../../../utils/http.utils';
import { DateUtils } from '../../../utils/date.utils';
import { DateMinutes } from '../../../enum/date-minutes.enum';

@Injectable({ providedIn: 'root' })
export class GetStoreLayoutUsecase {
  public store_layout: BehaviorSubject<StoreLayout>;

  constructor(private readonly cookie: CookieService) {
    this.store_layout = new BehaviorSubject<StoreLayout>(this.getStoreLayout());
  }

  getStoreLayout(): StoreLayout {
    const layout = this.cookie.get(StoreCookiesKeys.STORE_LAYOUT);

    if (!layout) {
      return null;
    }

    try {
      let decryp, store_layout: StoreLayout;
      decryp = CryptoJS.AES.decrypt(layout, StoreCookiesKeys.STORE_LAYOUT);
      store_layout = JSON.parse(decryp.toString(CryptoJS.enc.Utf8)); // DECRYP 2

      if (typeof store_layout == 'string') {
        store_layout = JSON.parse(store_layout);
      }

      return new StoreLayout(store_layout);
    } catch (error) {
      return null;
    }
  }

  async setStoreLayout(store_layout: StoreLayout): Promise<void> {
    const encryp = await CryptoJS.AES.encrypt(
      JSON.stringify(JSON.stringify(store_layout)),
      StoreCookiesKeys.STORE_LAYOUT
    ).toString();

    const hostname = await HttpUtils.getHostnameWithoutWWW();
    const date = await DateUtils.getDateInFuture(DateMinutes['24_HOUR']);

    await this.cookie.set(
      StoreCookiesKeys.STORE_LAYOUT,
      encryp,
      date,
      '/',
      hostname,
      HttpUtils.isSecureProtocol(),
      'Lax'
    );

    await this.store_layout.next(store_layout);
  }
}
