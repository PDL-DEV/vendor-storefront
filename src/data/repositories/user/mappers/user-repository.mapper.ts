import { Mapper } from '../../../../base/mapper';
import { UserModel } from '../../../../core/models/user.model';
import { UserEntity } from '../entities/user.entity';

export class UserImplementationRepositoryManager extends Mapper<
  UserEntity,
  UserModel
> {
  override mapFrom(param: UserEntity): UserModel {
    return {
      id: param.id,
      document: param.document,
      email: param.email,
      name: param.name,
      phone: param.phone,
      reference: param.reference,
      store_id: param.store_id,
    };
  }

  override mapTo(param: UserModel): UserEntity {
    return {
      id: param.id,
      document: param.document,
      email: param.email,
      name: param.name,
      phone: param.phone,
      reference: param.reference,
      store_id: param.store_id,
    };
  }
}
