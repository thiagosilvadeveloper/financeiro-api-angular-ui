import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Contato } from 'src/app/core/models/pessoa.model';

@Component({
  selector: 'app-pessoa-cadastro-contatos',
  templateUrl: './pessoa-cadastro-contatos.component.html',
  styleUrls: ['./pessoa-cadastro-contatos.component.css']
})
export class PessoaCadastroContatosComponent implements OnInit {

  @Input() contatos: Array<Contato>;
  exibindoFormularioContato = false;
  contato: Contato;
  contatoIndex: number;

  constructor() { }

  ngOnInit() {
  }

  novoContato() {
    this.contato = new Contato();
    this.contatoIndex = this.contatos.length;
    this.exibindoFormularioContato = true;
  }

  editarContato(contato: Contato, index: number) {
    this.contato = Contato.clone(contato);
    this.contatoIndex = index;
    this.exibindoFormularioContato = true;
  }

  confirmarContato(form: FormControl) {
    const contatoClonado = Contato.clone(this.contato);
    this.contatos[this.contatoIndex] = contatoClonado;

    form.reset();

    this.exibindoFormularioContato = false;
  }

  excluirContato(index: number) {
    this.contatos.splice(index, 1);
  }

  get titulo(): string {
    return `${this.isEditando() ? 'Editar' : 'Nova'} Contato`;
  }

  private isEditando(): boolean {
    return Boolean(this.contato.codigo);
  }
}
