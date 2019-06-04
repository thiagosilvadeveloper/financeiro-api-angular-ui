import { MessageModule } from 'primeng/message';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagemErroComponent } from './mensagem-erro/mensagem-erro.component';

@NgModule({
  declarations: [
    MensagemErroComponent
  ],
  imports: [
    CommonModule,
    MessageModule
  ],
  exports: [
    MensagemErroComponent
  ]
})
export class SharedModule { }
