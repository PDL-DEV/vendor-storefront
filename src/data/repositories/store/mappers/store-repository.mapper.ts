import { Mapper } from '../../../../base/mapper';
import { StoreModel } from '../../../../core/models/store.model';
import { StoreEntity } from '../entities/store.entity';

export class StoreImplementationRepositoryMapper extends Mapper<
  StoreEntity,
  StoreModel
> {
  override mapFrom(param: StoreEntity): StoreModel {
    return {
      id: param.id,
      domain: param.domain,
      layout: {
        primary_color: param.primary_color,
        secondary_color: param.secondary_color,
        logotipo_url: param.logotipo_url,
      },
    };
  }

  override mapTo(param: StoreModel): StoreEntity {
    return {
      id: param.id,
      domain: param.domain,
      primary_color: param.layout.primary_color,
      secondary_color: param.layout.secondary_color,
      logotipo_url: param.layout.logotipo_url      
    };
  }
}
