import { MoneyHttp } from './../seguranca/money-http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../core/models/pessoa.model';
import { environment } from 'src/environments/environment';


@Injectable()
export class PessoasService {

  private pessoasUrl: string;

  constructor(
    private http: MoneyHttp
  ) {
    this.pessoasUrl = `${environment.urlApi}/pessoas`;
  }

  criar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post<Pessoa>(this.pessoasUrl, JSON.stringify(pessoa)).toPromise();
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.pessoasUrl).toPromise()
      .then(response => {
        const responseJson = response;

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

    return this.http.get(this.pessoasUrl, { params }).toPromise()
      .then(response => {
        const responseJson = response;

        const resposta = {
          pessoas: responseJson['content'],
          totalElementos: responseJson['totalElements']
        };

        return resposta;
      });

  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`).toPromise()
      .then(() => null);
  }

  alterarStatus(codigo: number, ativo: boolean): Promise<void> {
    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo).toPromise()
      .then(() => null);
  }

  buscaPeloCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`).toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, JSON.stringify(pessoa)).toPromise();
  }
}

export class PessoaFilter {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}
