import { AutenticacaoService } from './../autenticacao.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string;
  senha: string;

  constructor(
    private autenticacaoService: AutenticacaoService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {
    this.autenticacaoService.removerToken();
  }

  ngOnInit() {
  }

  acessar(form: FormControl) {
    this.autenticacaoService.login(this.usuario, this.senha)
      .then(() => this.router.navigate(['/lancamentos']))
      .catch(error => this.errorHandler.handle(error));
  }
}
