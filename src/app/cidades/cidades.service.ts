import { Injectable } from '@angular/core';
import { MoneyHttp } from '../seguranca/money-http';

@Injectable()
export class CidadesService {

  private cidadesUri = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/';

  constructor(
    private http: MoneyHttp
  ) { }

  buscarPorEstado(codigo: number): Promise<any> {
    return this.http.get(`${this.cidadesUri}/${codigo}/municipios`).toPromise();
  }

}
