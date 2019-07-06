import { ErrorHandlerService } from './../error-handler.service';
import { LogoutService } from './../../seguranca/logout.service';
import { Component } from '@angular/core';
import { AutenticacaoService } from 'src/app/seguranca/autenticacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  exibindoMenu = false;

  constructor(
    public auth: AutenticacaoService,
    private errorService: ErrorHandlerService,
    private logoutService: LogoutService,
    private router: Router
  ) {}

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.auth.removerToken();
        this.router.navigate(['/login']);
      })
      .catch(error => this.errorService.handle(error));
  }

  get nome(): string {
    return this.auth.jwtPayload ? this.auth.jwtPayload.nome : '';
  }
}
