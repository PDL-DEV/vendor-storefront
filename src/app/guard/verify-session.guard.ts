import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticateUserUsecase } from '../modules/account/usecase/authenticate-user.usecase';

export const verifySessionGuard: CanActivateFn = (route, state) => {
  if (inject(AuthenticateUserUsecase).getCurrentUser() == null) {
    window.location.href = '/login';
    return false;
  }

  return true;
};
