import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';

import pt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(pt);

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    CommonModule,
    ToastModule,
  ],
  providers: [
    ErrorHandlerService,
    ConfirmationService,
    MessageService,
    { provide: LOCALE_ID, useValue: 'pt-BR'} // provider por valor
  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule
  ]
})
export class CoreModule { }
