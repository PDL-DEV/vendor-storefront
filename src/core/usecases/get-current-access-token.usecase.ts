import { UseCase } from '../../base/use-case';
import { AccessTokenModel } from '../models/access-token.model';
import { AccessTokenRepository } from '../repositories/access-token.repository';

export class GetCurrentAccessTokenUsecase implements UseCase<AccessTokenModel, AccessTokenModel>{
  constructor(private readonly accessTokenRepository: AccessTokenRepository) {}

  get(): AccessTokenModel {
    return this.accessTokenRepository.getAccessToken();
  }
}
