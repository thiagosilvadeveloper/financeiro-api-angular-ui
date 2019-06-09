import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../core/models/pessoa.model';

@Injectable()
export class PessoasService {

  _URL = 'http://localhost:8080/pessoas';

  constructor(
    private http: HttpClient
  ) { }

  criar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post(this._URL, JSON.stringify(pessoa)).toPromise()
      .then(response => (response as Pessoa));
  }

  listarTodas(): Promise<any> {
    return this.http.get(this._URL).toPromise()
      .then(response => {
        const responseJson = (response as JSON);

        const resposta = {
          pessoas: responseJson['content'],
          totalElementos: responseJson['totalElements']
        };

        return resposta;
      });
  }

  pesquisar(filtro: PessoaFilter): Promise<any> {
    let params = new HttpParams();

    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get(this._URL, { params }).toPromise()
      .then(response => {
        const responseJson = (response as JSON);

        const resposta = {
          pessoas: responseJson['content'],
          totalElementos: responseJson['totalElements']
        };

        return resposta;
      });

  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this._URL}/${codigo}`).toPromise()
      .then(() => null);
  }

  alterarStatus(codigo: number, ativo: boolean): Promise<void> {
    return this.http.put(`${this._URL}/${codigo}/ativo`, ativo).toPromise()
      .then(() => null);
  }

  buscaPeloCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get(`${this._URL}/${codigo}`).toPromise()
      .then(response => (response as Pessoa));
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put(`${this._URL}/${pessoa.codigo}`, JSON.stringify(pessoa)).toPromise()
      .then(response => (response as Pessoa));
  }
}

export class PessoaFilter {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}
