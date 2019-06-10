import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/seguranca/autenticacao.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private authService: AutenticacaoService
  ) {}

  temPermissao(role: string): boolean {
    return this.authService.jwtPayload && this.authService.jwtPayload.authorities.includes(role);
  }

  get nome(): string {
    return this.authService.jwtPayload ? this.authService.jwtPayload.nome : '';
  }
}
