import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService
  ) { }

  handle(response: any) {
    let message: string;

    if (typeof response === 'string') {
      message = response;
    } else if (response.error[0]['mensagemUsuario']) {
      message = response.error[0]['mensagemUsuario'];
    } else {
      message = 'Errro ao consumir recurso API. Tente novamente.';
      console.error('Ocorreu um erro', response);
    }

    this.messageService.add({severity: 'error', summary: 'Erro', detail: message});
  }
}
