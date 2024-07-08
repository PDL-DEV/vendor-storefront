import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GetCurrentUserUsecase } from '../../core/usecases/get-current-user.usecase';

export const verifySessionGuard: CanActivateFn = (route, state) => {
  if (inject(GetCurrentUserUsecase).get() == null) {
    window.location.href = '/login';
    return false;
  }

  return true;
};
