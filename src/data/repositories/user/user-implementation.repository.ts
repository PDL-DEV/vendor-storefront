import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { UserRepository } from '../../../core/repositories/user.repository';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserLoginDto } from '../../../core/dto/user-login.dto';
import { UserModel } from '../../../core/models/user.model';
import { RequestHeaders } from '../../../base/request-headers';
import { UserEntity } from './entities/user.entity';
import { environment } from '../../../environments/environment';
import { UserImplementationRepositoryManager } from './mappers/user-repository.mapper';
import { AccessTokenModel } from '../../../core/models/access-token.model';
import { AccessTokenImplementationRepositoryManager } from '../access-token/mappers/access-token-repository.mappers';
import { AuthCookiesKeys } from '../../../enums/auth-cookies-keys.enum';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';
import { HttpUtils } from '../../../utils/http.utils';
import { DateUtils } from '../../../utils/date.utils';
import { DateMinutes } from '../../../enums/date-minutes.enum';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserImplementationRepository extends UserRepository {
  private userMapper = new UserImplementationRepositoryManager();
  private accessTokenMapper = new AccessTokenImplementationRepositoryManager();

  user: BehaviorSubject<UserModel>;

  constructor(
    private readonly http: HttpClient,
    private readonly requestHeaders: RequestHeaders,
    private readonly cookie: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    super();
    this.user = new BehaviorSubject<UserModel>(this.getCurrentUser());
  }

  override login(params: UserLoginDto): Observable<AccessTokenModel> {
    return this.http
      .post<AccessTokenModel>(`${environment.endpoint}/auth`, params, {
        headers: this.requestHeaders.getHeaders(),
      })
      .pipe(map(this.accessTokenMapper.mapFrom));
  }

  override getUser(): Observable<UserModel> {
    return this.http
      .get<UserEntity>(`${environment.endpoint}/auth`, {
        headers: this.requestHeaders.getHeaders(),
      })
      .pipe(map(this.userMapper.mapFrom));
  }

  getCurrentUser(): UserModel {
    if (this.cookie.get(AuthCookiesKeys.CURRENT_USER)) {
      try {
        let cus = this.cookie.get(AuthCookiesKeys.CURRENT_USER);
        let decryp, decryp2: UserModel;
        decryp = CryptoJS.AES.decrypt(cus, AuthCookiesKeys.CURRENT_USER);
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

  override setCurrentUser(params: UserModel): void {
    const encryp = CryptoJS.AES.encrypt(
      JSON.stringify(params),
      AuthCookiesKeys.CURRENT_USER
    ).toString();
    const hostname = HttpUtils.getHostnameWithoutWWW();
    const date = DateUtils.getDateInFuture(DateMinutes['24_HOUR']);

    this.cookie.set(
      AuthCookiesKeys.CURRENT_USER,
      encryp,
      date,
      '/',
      hostname,
      HttpUtils.isSecureProtocol(),
      'Lax'
    );
    this.user.next(params);
  }

  override logout(): Observable<UserModel> {
    if (isPlatformBrowser(this.platformId)) {
      const hostname = HttpUtils.getHostnameWithoutWWW();

      if (this.user) {
        this.user.next(null);
        for (const cookieKey of Object.values(AuthCookiesKeys)) {
          this.cookie.delete(
            cookieKey,
            '/',
            hostname,
            HttpUtils.isSecureProtocol(),
            'Lax'
          );
        }
      }

      return this.user;
    }
  }
}
