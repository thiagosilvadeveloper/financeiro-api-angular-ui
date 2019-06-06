import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private errorHandlerService: ErrorHandlerService,
    private pessoaService: PessoasService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigo = this.route.snapshot.params['codigo'];
    if (codigo) {
      this.carregarPessoa(codigo);
    } else {
      this.atualizarTitulo();
    }
  }

  salvar(form: FormControl) {
    if (this.isEditando()) {
      this.atualizarPessoa(form);
    } else {
      this.criarPessoa(form);
    }
  }

  novo(form: FormControl) {
    form.reset();
    this.pessoa = new Pessoa();

    this.router.navigate(['/pessoas/novo']);
  }

  get titulo(): string {
    return `${this.isEditando() ? 'Editar' : 'Nova'} Pessoa`;
  }

  private isEditando(): boolean {
    return Boolean(this.pessoa.codigo);
  }

  private carregarPessoa(codigo: any) {
    this.pessoaService.buscaPeloCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTitulo();
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  private atualizarTitulo() {
    this.title.setTitle(`${this.isEditando() ? 'Edição de' :  'Nova'} Pessoa`);
  }

  private atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(() => {
        this.router.navigate(['/pessoas']);
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  private criarPessoa(form: FormControl) {
    this.pessoaService.criar(this.pessoa)
      .then(pessoa => {
        form.reset();
        this.pessoa = new Pessoa();

        this.messageService.add({severity: 'success', summary: 'Confirmação', detail: 'Pessoa criada com sucesso.'});

        this.router.navigate(['/pessoas']);
      })
      .catch(error => this.errorHandlerService.handle(error));
  }
}
