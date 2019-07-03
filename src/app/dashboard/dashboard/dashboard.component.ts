import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { DashboardService } from './../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData: any;

  lineChartData: any;

  options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const valor = dataset.data[tooltipItem.index];
          const label = dataset.label ? (dataset.label + ': ') : '';

          return label + this.decimalPipe.transform(valor, '1.2-2');
        }
      }
    }
  };

  constructor(
    private dashBoardService: DashboardService,
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit() {
    this.configurarGraficoPizza();
    this.configurarGraficoLinha();
  }

  configurarGraficoPizza() {
    this.dashBoardService.lancamentosPorCategoria()
    .then(dados => {
      this.pieChartData = {
        labels: dados.map(dado => dado.categoria.nome),
          datasets: [
            {
              data: dados.map(dado => dado.total),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC']
            }
          ]
        };
      });
  }

  configurarGraficoLinha() {
    this.dashBoardService.lancamentosPorDia()
      .then(dados => {
        const diasDoMes = this.carregarDiasDoMes();
        const totalDeReceitas = this.carregarTotal(dados.filter(dado => dado.tipo === 'RECEITA'), diasDoMes);
        const totalDeDespesas = this.carregarTotal(dados.filter(dado => dado.tipo === 'DESPESA'), diasDoMes);

        this.lineChartData = {
          labels: diasDoMes.map(dia => dia),
          datasets: [
            {
              label: 'Receitas',
              data: totalDeReceitas.map(total => total),
              borderColor: '#3366CC'
            }, {
              label: 'Despesas',
              data: totalDeDespesas.map(total => total),
              borderColor: '#D62B00'
            }
          ]
        };
      });
  }

  carregarTotal(dados: any, diasDoMes: any[]): number[] {
    const totais = [];

    diasDoMes.forEach(dia => {
      let total = 0;

      dados.map(dado => {
        if (dado.dia.getDate() === dia) {
          total = dado.total;
        }
      });

      totais.push(total);
    });

    return totais;
  }

  carregarDiasDoMes() {
    const dataHoje = new Date();
    const ultimoDiaMes = new Date(dataHoje.getFullYear(), dataHoje.getMonth() + 1, 0);
    const diasDoMes = [];

    for (let dia = 1; dia <= ultimoDiaMes.getDate(); dia++) {
      diasDoMes.push(dia);
    }

    return diasDoMes;
  }
}
