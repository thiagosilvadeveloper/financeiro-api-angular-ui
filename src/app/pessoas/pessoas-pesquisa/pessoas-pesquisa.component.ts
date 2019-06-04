import { PessoasService, PessoaFilter } from './../pessoas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalElementos = 0;
  pessoas = [];

  filtro = new PessoaFilter();

  constructor(
    private pessoaService: PessoasService
  ) { }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resposta => {
        this.pessoas = resposta.pessoas;
        this.totalElementos = resposta.totalElementos;

        console.log('Total elementos: ', this.totalElementos);
      });
  }

  aoMudarPagina(event: any) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }
}
