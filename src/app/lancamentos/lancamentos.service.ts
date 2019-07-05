import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Lancamento } from './../core/models/lancamento.model';

import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable()
export class LancamentosService {

  private lancamentosUrl: string;

  constructor(
    private http: HttpClient
  ) {
    console.log(environment.urlApi);

    this.lancamentosUrl = `${environment.urlApi}/lancamentos`;
  }

  criar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.post(`${this.lancamentosUrl}`, JSON.stringify(lancamento)).toPromise()
      .then(response => (response as Lancamento));
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
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

    return this.http.get(`${this.lancamentosUrl}?resumo`, { params } )
      .toPromise()
      .then(response => {
        const responseJson = (response as JSON);

        const resposta = {
          lancamentos: responseJson ? responseJson['content'] : null,
          totalElementos: responseJson ? responseJson['totalElements'] : 0
        }

        return resposta;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`).toPromise()
      .then(() => null);
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`, JSON.stringify(lancamento)).toPromise()
      .then(response => {
        const lancamento = (response as Lancamento);
        this.converterStringParaDatas([lancamento]);

        return lancamento;
      });
  }

  buscaPeloCodigo(codigo: number): Promise<Lancamento> {
    return this.http.get(`${this.lancamentosUrl}/${codigo}`).toPromise()
      .then(response => {
        const lancamento = (response as Lancamento);
        this.converterStringParaDatas([lancamento]);

        return lancamento;
      });
  }

  converterStringParaDatas(lancamentos: Lancamento[]) {
    lancamentos.map(lancamento => {
      if (lancamento.dataVencimento) {
        lancamento.dataVencimento = moment(lancamento.dataVencimento).toDate();
      }

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento).toDate();
      }
    });
  }

  get lancamentosAnexoUrl() {
    return `${this.lancamentosUrl}/anexo`;
  }
}

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;
  pagina = 0;
  itensPorPagina = 5;
}
