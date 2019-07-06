import { MoneyHttp } from './../seguranca/money-http';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable()
export class RelatoriosService {

  private relatoriosUri = `${environment.urlApi}/lancamentos/relatorios`;

  constructor(
    private http: MoneyHttp
  ) { }

  lancamentosPorPessoa(dataInicial: Date, dataFinal: Date): Promise<any> {
    let params = new HttpParams();

    params = params.append('inicio', moment(dataInicial).format('YYYY-MM-DD'));
    params = params.append('fim', moment(dataFinal).format('YYYY-MM-DD'));

    return this.http.get(`${this.relatoriosUri}/pessoa`, { params, responseType: 'blob' }).toPromise();
  }
}
