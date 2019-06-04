import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [
    { label: 'Moradia', value: 0 },
    { label: 'Outras', value: 1 }
  ];

  pessoas = [
    { label: 'Darth Vader', value: 0 },
    { label: 'John Snow', value: 1 },
    { label: 'Walter White', value: 2 }
  ];
  constructor() { }

  ngOnInit() {
  }

}
