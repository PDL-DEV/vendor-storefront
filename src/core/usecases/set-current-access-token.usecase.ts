import { UseCase } from '../../base/use-case';
import { AccessTokenModel } from '../models/access-token.model';
import { AccessTokenRepository } from '../repositories/access-token.repository';

export class SetCurrentAccessTokenUsecase
  implements UseCase<AccessTokenModel, AccessTokenModel>
{
  constructor(private readonly accessTokenRepository: AccessTokenRepository) {}

  set(params?: AccessTokenModel): void {
    this.accessTokenRepository.setAccessToken(params);
  }
}
