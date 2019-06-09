import { AutenticacaoInterceptor } from './autenticacao.interceptor';
import { AutenticacaoService } from './autenticacao.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';

import { InputTextModule } from 'primeng/inputtext';

import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

export function tokenGetter(): string {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    SegurancaRoutingModule,

    ButtonModule,
    InputTextModule,

    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080']
      }
    })
  ],
  providers: [
    AutenticacaoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticacaoInterceptor,
      multi: true
    }
  ]
})
export class SegurancaModule { }
