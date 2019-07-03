import { Component, OnInit } from '@angular/core';
import { RelatoriosService } from '../relatorios.service';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  dataInicial: Date;
  dataFinal: Date;

  constructor(
    private relatoriosService: RelatoriosService
  ) { }

  ngOnInit() {
  }

  gerar() {
    this.relatoriosService.lancamentosPorPessoa(this.dataInicial, this.dataFinal)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);
        window.open(url);
      });
  }

}
