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
    } else if (response instanceof Response
      && response.status >= 400 && response.status <= 499) {
      let errors;
      message = 'Ocorreu um erro ao processar a sua solicitação';
      try {
        errors = response.json();
        message = errors[0].mensagemUsuario;
      } catch (e) { }

    } else {
      message = 'Erro ao consumir recurso API. Tente novamente.';
      console.error('Ocorreu um erro', response);
    }

    this.messageService.add({severity: 'error', summary: 'Erro', detail: message});
  }
}
