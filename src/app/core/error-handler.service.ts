import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService
  ) { }

  handle(error: any) {
    let message: string;

    if (typeof error === 'string') {
      message = error;
    } else {
      message = 'Errro ao consumir recurso API. Tente novamente.';
      console.error('Ocorreu um erro', error);
    }

    this.messageService.add({severity: 'error', summary: 'Erro', detail: message});
  }
}
