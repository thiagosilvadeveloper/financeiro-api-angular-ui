import { MoneyHttp } from './../seguranca/money-http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Estado } from '../core/models/estado.model';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  private estadosUri = `${environment.urlApi}/estados`;

  constructor(
    private http: MoneyHttp
  ) { }

  listarTodos(): Promise<any> {
    return this.http.get(this.estadosUri).toPromise()
      .then(response => (response as JSON));
  }

  buscaPorCodigo(codigo: number): Promise<Estado> {
    return this.http.get<Estado>(`${this.estadosUri}/${codigo}`).toPromise();
  }
}
