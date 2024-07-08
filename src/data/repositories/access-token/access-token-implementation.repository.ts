import { BehaviorSubject, Observable } from 'rxjs';
import { AccessTokenModel } from '../../../core/models/access-token.model';
import { AccessTokenRepository } from '../../../core/repositories/access-token.repository';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';
import { AuthCookiesKeys } from '../../../enums/auth-cookies-keys.enum';
import { HttpUtils } from '../../../utils/http.utils';
import { DateUtils } from '../../../utils/date.utils';
import { DateMinutes } from '../../../enums/date-minutes.enum';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AccessTokenImplementationRepository extends AccessTokenRepository {
  accessToken: BehaviorSubject<AccessTokenModel>;

  constructor(private readonly cookie: CookieService) {
    super();
    this.accessToken = new BehaviorSubject<AccessTokenModel>(
      this.getAccessToken()
    );
  }

  override getAccessToken(): AccessTokenModel {
    if (this.cookie.get(AuthCookiesKeys.ACCESS_TOKEN_KEY)) {
      try {
        let cus = this.cookie.get(AuthCookiesKeys.ACCESS_TOKEN_KEY);
        let decryp, decryp2: AccessTokenModel;
        decryp = CryptoJS.AES.decrypt(cus, AuthCookiesKeys.ACCESS_TOKEN_KEY);
        decryp2 = JSON.parse(decryp.toString(CryptoJS.enc.Utf8)); // DECRYP 2

        if (typeof decryp2 == 'string') {
          decryp2 = JSON.parse(decryp2);
        }

        return decryp2;
      } catch (error) {
        return null;
      }
    }

    return null;
  }

  override currentAccessToken(): Observable<AccessTokenModel> {
    return this.accessToken;
  }

  override setAccessToken(params: AccessTokenModel): void {
    const encryp = CryptoJS.AES.encrypt(
      JSON.stringify(params),
      AuthCookiesKeys.ACCESS_TOKEN_KEY
    ).toString();
    const hostname = HttpUtils.getHostnameWithoutWWW();
    const date = DateUtils.getDateInFuture(DateMinutes['24_HOUR']);

    this.cookie.set(
      AuthCookiesKeys.ACCESS_TOKEN_KEY,
      encryp,
      date,
      '/',
      hostname,
      HttpUtils.isSecureProtocol(),
      'Lax'
    );

    this.accessToken.next(params);
  }
}
