import { Observable } from 'rxjs';
import { AccessTokenModel } from '../models/access-token.model';

export abstract class AccessTokenRepository {
  abstract setAccessToken(params: AccessTokenModel): void;
  abstract currentAccessToken(): Observable<AccessTokenModel>;
  abstract getAccessToken(): AccessTokenModel;
}
