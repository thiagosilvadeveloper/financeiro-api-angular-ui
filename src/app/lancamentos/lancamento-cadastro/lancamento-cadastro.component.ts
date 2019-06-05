import { MessageService } from 'primeng/api';
import { LancamentosService } from './../lancamentos.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Lancamento } from 'src/app/core/models/lancamento.model';

import { CategoriasService } from 'src/app/categorias/categorias.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoasService } from './../../pessoas/pessoas.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];
  pessoas = [];

  lancamento = new Lancamento();

  constructor(
    private categoriasService: CategoriasService,
    private errorHandlerService: ErrorHandlerService,
    private lancamentoService: LancamentosService,
    private messageService: MessageService,
    private pessoaService: PessoasService
  ) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: FormControl) {
    this.lancamentoService.criar(this.lancamento)
      .then(lancamento => {
        form.reset();
        this.lancamento = new Lancamento();

        this.messageService.add({severity: 'success', summary: 'Confirmação', detail: 'Lançamento criado com sucesso.'});
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
      .then(resposta => {
        this.pessoas = resposta.pessoas.map(p => ({ label: p.nome, value: p.codigo }));
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  private carregarCategorias() {
    this.categoriasService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(error => this.errorHandlerService.handle(error));
  }
}
