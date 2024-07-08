import { Observable } from 'rxjs';

export interface UseCase<S, T> {
  execute?(params?: S): Observable<T>;
  set?(params?: S): void;
  get?(params?: S): T;
}
