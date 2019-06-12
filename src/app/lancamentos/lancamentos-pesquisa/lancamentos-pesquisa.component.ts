import { AutenticacaoService } from './../../seguranca/autenticacao.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentosService, LancamentoFiltro } from './../lancamentos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalElementos = 0;
  filtro = new LancamentoFiltro();

  lancamentos = [];

  @ViewChild('tabela') tabela;

  constructor(
    public auth: AutenticacaoService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private lancamentoService: LancamentosService,
    private messageService: MessageService,
    private title: Title
  ) { }

  ngOnInit() {
    // this.pesquisar(); -- O método aoMudarPagina já é executado ao inicializar

    this.title.setTitle('Lançamentos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resposta => {
        this.lancamentos = resposta.lancamentos;
        this.totalElementos = resposta.totalElementos;
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  aoMudarPagina(event: any) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir ?',
      accept: () => this.excluir(lancamento)
    });
  }

  private excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        this.tabela.first = 0;
        this.pesquisar();

        this.messageService.add({severity: 'success', summary: 'Confirmação', detail: 'Lançamento excluído com sucesso.'});
      })
      .catch(error => this.errorHandlerService.handle(error));
  }
}
