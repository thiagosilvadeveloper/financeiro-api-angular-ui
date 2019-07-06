
export class Estado {
  codigo: number;
  nome: string;
  sigla: string;

  static porNome(estado1: Estado, estado2: Estado): number {
    if (estado1.nome > estado2.nome) {
      return 1;
    } else if (estado1.nome < estado2.nome) {
      return -1;
    }

    return 0;
  }

}
