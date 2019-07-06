import { MoneyHttp } from './../seguranca/money-http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private categoriasUrl: string;

  constructor(
    private http: MoneyHttp
  ) {
    this.categoriasUrl = `${environment.urlApi}/categorias`;
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.categoriasUrl).toPromise();
  }
}
