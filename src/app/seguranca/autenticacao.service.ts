import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/add/observable/fromPromise';
import { environment } from 'src/environments/environment';

@Injectable()
export class AutenticacaoService {

  private autenticacaoUrl: string;
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {
    this.autenticacaoUrl = `${environment.urlApi}/oauth/token`;
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `client=angular&username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.autenticacaoUrl, body, { headers }).toPromise()
      .then(response => {
        this.armazenarToken((response as JSON)['access_token']);
      })
      .catch(response => {
        if (response.status === 400) {
          const responseJson = (response as JSON)['error'];

          if (responseJson['error'] === 'invalid_grant') {
            return Promise.reject('Usuário e/ou senha inválidos');
          }
        }

        return Promise.reject(response);
      });
  }

  refreshToken(): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';

    return this.http.post(this.autenticacaoUrl, body, { headers, withCredentials: true }).toPromise()
      .then(response => {
        this.armazenarToken((response as JSON)['access_token']);
        return Promise.resolve(null);
      });
  }

  removerToken() {
    this.jwtPayload = null;
    localStorage.removeItem('access_token');
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('access_token');

    return !token || this.jwtHelperService.isTokenExpired(token);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  temPermissao(role: string): boolean {
    return this.jwtPayload && this.jwtPayload.authorities.includes(role);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (!this.temPermissao(role)) {
        return false;
      }
    }

    return true;
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelperService.decodeToken(token);
    localStorage.setItem('access_token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.armazenarToken(token);
    }
  }

}
