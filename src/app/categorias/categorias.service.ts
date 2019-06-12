import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private categoriasUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.categoriasUrl = `${environment.urlApi}/categorias`;
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.categoriasUrl).toPromise()
      .then(response => (response as JSON));
  }
}
