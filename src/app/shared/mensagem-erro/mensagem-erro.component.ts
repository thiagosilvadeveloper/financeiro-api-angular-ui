import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-mensagem-erro',
  template: `
    <p-message severity="error" [text]="mensagem" *ngIf="temErro()"></p-message>
  `,
  styleUrls: ['./mensagem-erro.component.css']
})
export class MensagemErroComponent {

  @Input() erro: string;
  @Input() control: FormControl;
  @Input() mensagem: string;

  temErro() {
    return this.control.hasError(this.erro) && this.control.dirty;
  }
}
