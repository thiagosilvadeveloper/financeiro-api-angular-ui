import { MessageService } from 'primeng/api';
import { LancamentosService } from './../lancamentos.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Lancamento } from 'src/app/core/models/lancamento.model';

import { CategoriasService } from 'src/app/categorias/categorias.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoasService } from './../../pessoas/pessoas.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private pessoaService: PessoasService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigo = this.route.snapshot.params['codigo'];
    if (codigo) {
      this.carregarLancamento(codigo);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: FormControl) {
    if (this.isEditando()) {
      this.atualizar();
    } else {
      this.criar(form);
    }
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(() => {
      this.lancamento = new Lancamento();
    }, 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  get titulo(): string {
    return `${this.isEditando() ? 'Editar' : 'Novo'} Lançamento`;
  }

  private atualizar() {
    this.lancamentoService.atualizar(this.lancamento)
      .then(() => this.router.navigate(['/lancamentos']) );
  }

  private criar(form: FormControl) {
    this.lancamentoService.criar(this.lancamento)
      .then(lancamento => {
        form.reset();
        this.lancamento = new Lancamento();
        this.messageService.add({severity: 'success', summary: 'Confirmação', detail: 'Lançamento criado com sucesso.'});

        this.router.navigate(['/lancamentos']);
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  private isEditando(): boolean {
    return Boolean(this.lancamento.codigo);
  }

  private carregarLancamento(codigo: number) {
    this.lancamentoService.buscaPeloCodigo(codigo)
      .then(lancamento => this.lancamento = lancamento)
      .catch(error => this.errorHandlerService.handle(error));
  }

  private carregarPessoas() {
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
