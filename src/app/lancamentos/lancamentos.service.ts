import { Lancamento } from './../core/models/lancamento.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';


@Injectable()
export class LancamentosService {

  _URL = 'http://localhost:8080/lancamentos';
  _TOKEN = 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==';

  constructor(
    private http: HttpClient
  ) { }

  criar(lancamento: Lancamento): Promise<Lancamento> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this._TOKEN);
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post(`${this._URL}`, JSON.stringify(lancamento), { headers }).toPromise()
      .then(response => (response as Lancamento));
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this._TOKEN);

    let params = new HttpParams();

    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.append('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoDe) {
      params = params.append('dataVencimentoDe', moment(filtro.dataVencimentoDe).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoAte) {
      params = params.append('dataVencimentoAte', moment(filtro.dataVencimentoAte).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this._URL}?resumo`, { headers, params } )
      .toPromise()
      .then(response => {
        const responseJson = (response as JSON);

        const resposta = {
          lancamentos: responseJson['content'],
          totalElementos: responseJson['totalElements']
        }

        return resposta;
      });
  }

  excluir(codigo: number): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this._TOKEN);

    return this.http.delete(`${this._URL}/${codigo}`, { headers }).toPromise()
      .then(() => null);
  }
}

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;
  pagina = 0;
  itensPorPagina = 5;
}
