import { Observable } from 'rxjs';
import { UseCase } from '../../base/use-case';
import { AccessTokenModel } from '../models/access-token.model';
import { UserModel } from '../models/user.model';
import { AccessTokenRepository } from '../repositories/access-token.repository';
import { UserRepository } from '../repositories/user.repository';

export class GetCurrentUserUsecase implements UseCase<UserModel, UserModel>{
  constructor(private readonly userRepository: UserRepository) {}

  get(): UserModel {
    return this.userRepository.getCurrentUser();
  }
}
