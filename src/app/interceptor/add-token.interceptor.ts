// import { HttpInterceptorFn } from '@angular/common/http';

// export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };


import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable()
export class addTokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token = localStorage.getItem(environment.jwtTokenName);

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })

    return next.handle(request);
  }
}