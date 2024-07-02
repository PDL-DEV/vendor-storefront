import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AccountAuthService } from '../services/account-auth.service';
import { AuthDto } from '../dto/auth.dto';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AccountCookiesKeys } from '../enums/account-cookies-keys.enum';
import * as CryptoJS from 'crypto-js';
import { isPlatformBrowser } from '@angular/common';
import { HttpUtils } from '../../../utils/http.utils';
import { DateUtils } from '../../../utils/date.utils';
import { DateMinutes } from '../../../enum/date-minutes.enum';

@Injectable()
export class AuthenticateUserUsecase {
  public access_token: BehaviorSubject<string>;
  public current_user: BehaviorSubject<any>;

  constructor(
    private readonly cookie: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getAccessToken(): string {
    if (this.cookie.get(AccountCookiesKeys.ACCESS_TOKEN_KEY)) {
      try {
        let cus = this.cookie.get(AccountCookiesKeys.ACCESS_TOKEN_KEY);
        let decryp, decryp2: string;
        decryp = CryptoJS.AES.decrypt(cus, AccountCookiesKeys.ACCESS_TOKEN_KEY);
        decryp2 = JSON.parse(decryp.toString(CryptoJS.enc.Utf8)); // DECRYP 2

        if (typeof decryp2 == 'string') {
          decryp2 = JSON.parse(decryp2);
        }

        return decryp2;
      } catch (error) {
        this.logout();
      }
    }

    return null;
  }

  async setAccessToken(token: string): Promise<void> {
    const encryp = await CryptoJS.AES.encrypt(
      token,
      AccountCookiesKeys.ACCESS_TOKEN_KEY
    ).toString();
    const hostname = await HttpUtils.getHostnameWithoutWWW();
    const date = await DateUtils.getDateInFuture(DateMinutes['24_HOUR']);

    await this.cookie.set(
      AccountCookiesKeys.ACCESS_TOKEN_KEY,
      encryp,
      date,
      '/',
      hostname,
      HttpUtils.isSecureProtocol(),
      'Lax'
    );
    await this.access_token.next(token);
  }

  async logout() {
    if (isPlatformBrowser(this.platformId)) {
      const hostname = HttpUtils.getHostnameWithoutWWW();

      if (this.current_user) {
        this.current_user.next(null);
        this.access_token.next(null);
        for (const cookieKey of Object.values(AccountCookiesKeys)) {
          await this.cookie.delete(
            cookieKey,
            '/',
            hostname,
            HttpUtils.isSecureProtocol(),
            'Lax'
          );
        }
      }
    }
  }
}
