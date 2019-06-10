import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

    if (req.method !== 'GET' && !req.url.includes('/oauth/token')) {
      let authRequest: any;
      authRequest = req.clone({
          setHeaders: {
            'Content-Type': 'application/json'
          }
      });
      return next.handle(authRequest);
    }

    return next.handle(req);
  }
}
