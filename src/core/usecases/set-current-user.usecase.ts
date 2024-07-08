import { Observable } from 'rxjs';
import { UseCase } from '../../base/use-case';
import { UserModel } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';

export class SetCurrentUserUsecase implements UseCase<UserModel, UserModel> {
  constructor(private readonly userRepository: UserRepository) {}

  set(params?: UserModel): void {
    this.userRepository.setCurrentUser(params);
  }
}
