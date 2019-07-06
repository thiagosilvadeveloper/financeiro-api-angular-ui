import { AutenticacaoService } from 'src/app/seguranca/autenticacao.service';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PessoasService, PessoaFilter } from './../pessoas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalElementos = 0;
  pessoas = [];

  filtro = new PessoaFilter();

  @ViewChild('tabela') tabela;

  constructor(
    public auth: AutenticacaoService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private pessoaService: PessoasService,
    private messageService: MessageService,
    private title: Title
  ) { }

  ngOnInit() {
    this.pesquisar();

    this.title.setTitle('Pessoas');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resposta => {
        this.pessoas = resposta.pessoas;
        this.totalElementos = resposta.totalElementos;
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  aoMudarPagina(event: any) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir ?',
      accept: () => this.excluir(pessoa)
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        this.tabela.first = 0;
        this.pesquisar();

        this.messageService.add({severity: 'success', summary: 'Confirmação', detail: 'Pessoa excluída com sucesso.'});
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  alterarStatus(pessoa: any) {
    this.pessoaService.alterarStatus(pessoa.codigo, !pessoa.ativo)
      .then(() => pessoa.ativo = !pessoa.ativo )
      .catch(error => this.errorHandlerService.handle(error));
  }
}
