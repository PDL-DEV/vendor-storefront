import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { UserLoginDto } from '../dto/user-login.dto';
import { AccessTokenModel } from '../models/access-token.model';

export abstract class UserRepository {
  abstract login(params: UserLoginDto): Observable<AccessTokenModel>;
  abstract getUser(): Observable<UserModel>;
  abstract getCurrentUser(): UserModel;
  abstract setCurrentUser(params: UserModel): void;
  abstract logout(): Observable<UserModel>;
}
