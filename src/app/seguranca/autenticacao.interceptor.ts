import { AutenticacaoService } from './autenticacao.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

    if (req.headers.get('Content-Type') === 'application/x-www-form-urlencoded') {
      let authRequest: any;
      authRequest = req.clone({
          withCredentials: true
      });
      return next.handle(authRequest);

    } else {
      let authRequest: any;
      authRequest = req.clone({
          setHeaders: {
            'Content-Type': 'application/json'
          }
      });
      return next.handle(authRequest);
    }
  }
}
