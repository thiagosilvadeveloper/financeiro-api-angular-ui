import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable()
export class DashboardService {

  private estatisticasUri = `${environment.urlApi}/lancamentos/estatisticas`;

  constructor(
    private http: HttpClient
  ) { }

  lancamentosPorCategoria(): Promise<any> {
    const uri = `${this.estatisticasUri}/categoria`;

    return this.http.get(uri).toPromise()
      .then(response => (response as JSON));
  }

  lancamentosPorDia(): Promise<any> {
    const uri = `${this.estatisticasUri}/dia`;

    return this.http.get(uri).toPromise()
      .then(response => {
        const dados = (response as JSON);
        this.converterStringParaDatas(dados);

        return dados;
      });
  }

  converterStringParaDatas(dados: any) {
    dados.map(dado => {
      dado.dia = moment(dado.dia).toDate();
    });
  }
}
