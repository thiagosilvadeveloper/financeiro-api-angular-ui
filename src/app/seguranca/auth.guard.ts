import { AutenticacaoService } from 'src/app/seguranca/autenticacao.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from '../core/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AutenticacaoService,
    private errorHandle: ErrorHandlerService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.auth.isAccessTokenInvalido()) {
      return this.auth.refreshToken().then(() => {
        if (this.auth.isAccessTokenInvalido()) {
          return false;
        }

        return true;
      })
      .catch(error => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
        return false;
      });

    } else
    if (next.data.roles && !this.auth.temQualquerPermissao(next.data.roles)) {
      this.router.navigate(['/acesso-negado']);
      return false;
    }

    return true;
  }

}
