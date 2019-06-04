import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PessoasService {

  _URL = 'http://localhost:8080/pessoas';
  _TOKEN = 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==';

  constructor(
    private http: HttpClient
  ) { }

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
        }

        return resposta;
      });

  }
}

export class PessoaFilter {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}
