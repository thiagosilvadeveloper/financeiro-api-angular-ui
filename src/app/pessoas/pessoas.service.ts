import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../core/models/pessoa.model';

@Injectable()
export class PessoasService {

  _URL = 'http://localhost:8080/pessoas';
  _TOKEN = 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==';

  constructor(
    private http: HttpClient
  ) { }

  criar(pessoa: Pessoa): Promise<Pessoa> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this._TOKEN);
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post(this._URL, JSON.stringify(pessoa), { headers }).toPromise()
      .then(response => (response as Pessoa));
  }

  listarTodas(): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this._TOKEN);

    return this.http.get(this._URL, { headers }).toPromise()
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
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this._TOKEN);

    let params = new HttpParams();

    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get(this._URL, { headers, params }).toPromise()
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
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this._TOKEN);

    return this.http.delete(`${this._URL}/${codigo}`, { headers }).toPromise()
      .then(() => null);
  }

  alterarStatus(codigo: number, ativo: boolean): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this._TOKEN);
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put(`${this._URL}/${codigo}/ativo`, ativo, { headers }).toPromise()
      .then(() => null);
  }

  buscaPeloCodigo(codigo: number): Promise<Pessoa> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this._TOKEN);

    return this.http.get(`${this._URL}/${codigo}`, { headers }).toPromise()
      .then(response => (response as Pessoa));
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this._TOKEN);
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put(`${this._URL}/${pessoa.codigo}`, JSON.stringify(pessoa), { headers }).toPromise()
      .then(response => (response as Pessoa));
  }
}

export class PessoaFilter {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}
