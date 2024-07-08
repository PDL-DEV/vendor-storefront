import { Observable } from 'rxjs';
import { UseCase } from '../../base/use-case';
import { StoreModel } from '../models/store.model';
import { StoreRepository } from '../repositories/store.repository';

export class SetCurrentStoreUseCase implements UseCase<StoreModel, StoreModel> {
  constructor(private readonly storeRepository: StoreRepository) {}

  set(params: StoreModel): void {
    return this.storeRepository.setCurrentStore(params);
  }
}
