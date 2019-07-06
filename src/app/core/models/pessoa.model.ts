import { Estado } from './estado.model';

export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado = new Estado();
}

export class Contato {

  codigo: number;
  nome: string;
  email: string;
  telefone: string;

  constructor(codigo?: number, nome?: string, email?: string, telefone?: string) {
    this.codigo = codigo;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
  }

  static clone(contato: Contato): Contato {
    return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone);
  }
}

export class Pessoa {
  codigo: number;
  nome: string;
  endereco = new Endereco();
  ativo = true;
  contatos = new Array<Contato>();
}
