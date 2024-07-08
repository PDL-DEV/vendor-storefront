import { Mapper } from '../../../../base/mapper';
import { AccessTokenModel } from '../../../../core/models/access-token.model';
import { AccessTokenEntity } from '../entities/acess-token.entity';

export class AccessTokenImplementationRepositoryManager extends Mapper<
  AccessTokenEntity,
  AccessTokenModel
> {
  override mapFrom(param: AccessTokenEntity): AccessTokenModel {
    return {
      Token: param.Token,
    };
  }

  override mapTo(param: AccessTokenModel): AccessTokenEntity {
    return {
      Token: param.Token,
    };
  }
}
