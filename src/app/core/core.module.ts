import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, Title } from '@angular/platform-browser';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { NavbarComponent } from './navbar/navbar.component';

import { AutenticacaoService } from '../seguranca/autenticacao.service';
import { ErrorHandlerService } from './error-handler.service';

import pt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { SegurancaModule } from '../seguranca/seguranca.module';

registerLocaleData(pt);

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    CommonModule,
    RouterModule,
    ToastModule,
    SegurancaModule
  ],
  providers: [
    AutenticacaoService,
    ErrorHandlerService,
    ConfirmationService,
    MessageService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR'} // provider por valor
  ],
  exports: [
    ConfirmDialogModule,
    NavbarComponent,
    ToastModule,
    SegurancaModule
  ]
})
export class CoreModule { }
