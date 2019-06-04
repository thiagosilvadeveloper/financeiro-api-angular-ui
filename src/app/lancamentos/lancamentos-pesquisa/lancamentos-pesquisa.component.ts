import { LancamentosService, LancamentoFiltro } from './../lancamentos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalElementos = 0;
  filtro = new LancamentoFiltro();

  lancamentos = [];

  constructor(
    private lancamentoService: LancamentosService
  ) {
  }

  ngOnInit() {
    // this.pesquisar(); -- O método aoMudarPagina já é executado ao inicializar
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resposta => {
        this.lancamentos = resposta.lancamentos;
        this.totalElementos = resposta.totalElementos;
      });
  }

  aoMudarPagina(event: any) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }
}
