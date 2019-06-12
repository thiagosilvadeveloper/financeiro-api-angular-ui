import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AutenticacaoService } from './autenticacao.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class LogoutService {

  private logoutUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.logoutUrl = `${environment.urlApi}/tokens/revoke`;
  }

  logout(): Promise<void> {
    return this.http.delete(this.logoutUrl, { withCredentials: true }).toPromise()
      .then(() => null);
  }
}
