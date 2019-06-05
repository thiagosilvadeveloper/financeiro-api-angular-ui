import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Pessoa } from 'src/app/core/models/pessoa.model';

import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoasService } from './../pessoas.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent {

  pessoa = new Pessoa();

  constructor(
    private errorHandlerService: ErrorHandlerService,
    private pessoaService: PessoasService,
    private messageService: MessageService
  ) { }

  salvar(form: FormControl) {
    this.pessoaService.criar(this.pessoa)
      .then(pessoa => {
        form.reset();
        this.pessoa = new Pessoa();

        this.messageService.add({severity: 'success', summary: 'Confirmação', detail: 'Pessoa criada com sucesso.'});
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

}
