import { Observable } from 'rxjs';
import { UseCase } from '../../base/use-case';
import { UserModel } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';

export class UserLogoutUsecase implements UseCase<UserModel, UserModel> {
  constructor(private readonly userRepository: UserRepository) {}

  execute(): Observable<UserModel> {
    return this.userRepository.logout();
  }
}
