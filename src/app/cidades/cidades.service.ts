import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CidadesService {

  private cidadesUri = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/';

  constructor(
    private http: HttpClient
  ) { }

  buscarPorEstado(codigo: number): Promise<any> {
    return this.http.get(`${this.cidadesUri}/${codigo}/municipios`).toPromise()
      .then(response => (response as JSON));
  }

}
