import { Observable } from 'rxjs';
import { UseCase } from '../../base/use-case';
import { StoreModel } from '../models/store.model';
import { StoreRepository } from '../repositories/store.repository';

export class GetStoreUsecase implements UseCase<StoreModel, StoreModel> {
  constructor(
    private readonly storeRepository: StoreRepository    
  ) {}

  execute(): Observable<StoreModel> {        
    return this.storeRepository.getStore();
  }
}
