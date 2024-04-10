import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../service/loader.service';

@Injectable()
export class loaderInterceptor implements HttpInterceptor {

  constructor(private _loaderService: LoaderService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    if (request.headers.get("is-silent-call") == "false") {
      this._loaderService.showloader();
    }


    return next.handle(request).pipe(
      finalize(() => {
        if (request.headers.get("is-silent-call") == "false") {
          this._loaderService.hideloader();
        }
      })
    )
  }
}