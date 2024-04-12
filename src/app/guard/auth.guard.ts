import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UtilService } from '../service/util.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const _utilService = inject(UtilService);
  const _router = inject(Router);
  const _toastreService = inject(ToastrService);

  const isUserExists = _utilService.isUserLoggedInF();

  if(isUserExists){
    return true;
  }

  _toastreService.info("Login to see my uploads");
  return _router.navigate(['/login']);
};
