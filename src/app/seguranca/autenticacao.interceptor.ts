import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AutenticacaoService } from './autenticacao.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

  constructor(
    private authService: AutenticacaoService,
    private errorHandle: ErrorHandlerService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

    if (req.headers.get('Content-Type') === 'application/x-www-form-urlencoded') {
      let authRequest: any;
      authRequest = req.clone({
          withCredentials: true
      });
      return next.handle(authRequest);

    } else {
      let authRequest: any;

      if (this.authService.isAccessTokenInvalido()) {
        return this.refreshToken(req, next);
      } else {
        authRequest = req.clone({
          setHeaders: {
            'Content-Type': 'application/json'
          }
        });

        return next.handle(authRequest);
      }
    }
  }

  refreshToken(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const refreshToken = this.authService.refreshToken().then(() => {
      let authRequest: any;

      authRequest = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      return next.handle(authRequest);
    });

    return Observable.fromPromise(refreshToken);
  }
}
