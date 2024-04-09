import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UtilService } from '../service/util.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _utilService = inject(UtilService);
  const _router = inject(Router);

  const isUserExists = _utilService.isUserLoggedInF();

  if(isUserExists){
    return true;
  }

  return _router.navigate(['/login']);
};
