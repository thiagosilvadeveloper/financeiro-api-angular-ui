import { Pessoa } from './pessoa.model';
import { Categoria } from './categoria.model';

export class Lancamento {
  codigo: number;
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  tipo = 'RECEITA';
  categoria = new Categoria();
  pessoa = new Pessoa();
}
