import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { UserLoginDto } from '../dto/user-login.dto';

export abstract class UserRepository {
  abstract login(params: UserLoginDto): Observable<UserModel>;

  abstract getCurrentUser(): Observable<UserModel>;
}
