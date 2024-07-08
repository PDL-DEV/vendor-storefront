import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserRepository } from '../core/repositories/user.repository';
import { UserLoginUsecase } from '../core/usecases/user-login.usecase';
import { UserImplementationRepository } from './repositories/user/user-implementation.repository';
import { StoreRepository } from '../core/repositories/store.repository';
import { GetStoreUsecase } from '../core/usecases/get-store.usecase';
import { StoreImplementationRepository } from './repositories/store/store-implementation.repository';
import { SetCurrentStoreUseCase } from '../core/usecases/set-current-store.usecase';
import { GetCurrentStoreUsecase } from '../core/usecases/get-current-store.usecase';
import { SetCurrentUserUsecase } from '../core/usecases/set-current-user.usecase';
import { SetCurrentAccessTokenUsecase } from '../core/usecases/set-current-access-token.usecase';
import { AccessTokenRepository } from '../core/repositories/access-token.repository';
import { AccessTokenImplementationRepository } from './repositories/access-token/access-token-implementation.repository';
import { GetCurrentAccessTokenUsecase } from '../core/usecases/get-current-access-token.usecase';
import { GetCurrentUserUsecase } from '../core/usecases/get-current-user.usecase';
import { GetUserProfileUsecase } from '../core/usecases/get-user-profile.usecase';
import { RequestHeaders } from '../base/request-headers';
import { UserLogoutUsecase } from '../core/usecases/user-logout.usecase';

export const userLoginUseCaseProvider = {
  provide: UserLoginUsecase,
  useFactory: (repo: UserRepository) => new UserLoginUsecase(repo),
  deps: [UserRepository],
};

export const getStoreUsecaseProvider = {
  provide: GetStoreUsecase,
  useFactory: (repo: StoreRepository) => new GetStoreUsecase(repo),
  deps: [StoreRepository],
};

export const setCurrentStoreUsecaseProvider = {
  provide: SetCurrentStoreUseCase,
  useFactory: (repo: StoreRepository) => new SetCurrentStoreUseCase(repo),
  deps: [StoreRepository],
};

export const getCurrentStoreUsecaseProvider = {
  provide: GetCurrentStoreUsecase,
  useFactory: (repo: StoreRepository) => new GetCurrentStoreUsecase(repo),
  deps: [StoreRepository],
};

export const setCurrentUserUseCaseProvider = {
  provide: SetCurrentUserUsecase,
  useFactory: (repo: UserRepository) => new SetCurrentUserUsecase(repo),
  deps: [UserRepository],
};

export const getCurrentUserUseCaseProvider = {
  provide: GetCurrentUserUsecase,
  useFactory: (repo: UserRepository) => new GetCurrentUserUsecase(repo),
  deps: [UserRepository],
};

export const userLogoutUsecaseProvider = {
  provide: UserLogoutUsecase,
  useFactory: (repo: UserRepository) => new UserLogoutUsecase(repo),
  deps: [UserRepository],
};

export const getUserProfileUsecaseProvider = {
  provide: GetUserProfileUsecase,
  useFactory: (repo: UserRepository) => new GetUserProfileUsecase(repo),
  deps: [UserRepository],
};

export const setCurrentAccessTokenCaseProvider = {
  provide: SetCurrentAccessTokenUsecase,
  useFactory: (repo: AccessTokenRepository) =>
    new SetCurrentAccessTokenUsecase(repo),
  deps: [AccessTokenRepository],
};

export const getCurrentAccessTokenCaseProvider = {
  provide: GetCurrentAccessTokenUsecase,
  useFactory: (repo: AccessTokenRepository) =>
    new GetCurrentAccessTokenUsecase(repo),
  deps: [AccessTokenRepository],
};

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    userLoginUseCaseProvider,
    getStoreUsecaseProvider,
    setCurrentStoreUsecaseProvider,
    getCurrentStoreUsecaseProvider,
    setCurrentUserUseCaseProvider,
    setCurrentAccessTokenCaseProvider,
    getUserProfileUsecaseProvider,
    getCurrentUserUseCaseProvider,
    getCurrentAccessTokenCaseProvider,
    userLogoutUsecaseProvider,
    { provide: UserRepository, useClass: UserImplementationRepository },
    { provide: StoreRepository, useClass: StoreImplementationRepository },
    {
      provide: AccessTokenRepository,
      useClass: AccessTokenImplementationRepository,
    },
    RequestHeaders
  ],
})
export class DataModule {}
