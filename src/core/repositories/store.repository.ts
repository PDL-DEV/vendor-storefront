import { BehaviorSubject, Observable } from 'rxjs';
import { StoreModel } from '../models/store.model';

export abstract class StoreRepository {
  abstract getStore(): Observable<StoreModel>;
  abstract currentStore(): Observable<StoreModel>;
  abstract setCurrentStore(params: StoreModel): void;
}
