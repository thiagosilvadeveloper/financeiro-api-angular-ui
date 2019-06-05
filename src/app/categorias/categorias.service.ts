import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  _URL = 'http://localhost:8080/categorias';
  _TOKEN = 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==';

  constructor(
    private http: HttpClient
  ) { }

  listarTodas(): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this._TOKEN);

    return this.http.get(this._URL, { headers }).toPromise()
      .then(response => (response as JSON));
  }
}
