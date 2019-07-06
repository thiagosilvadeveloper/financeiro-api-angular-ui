import { CidadesService } from './../../cidades/cidades.service';
import { EstadosService } from './../../estados/estados.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Pessoa } from 'src/app/core/models/pessoa.model';

import { MessageService, SelectItem } from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoasService } from './../pessoas.service';
import { Estado } from 'src/app/core/models/estado.model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  estados: SelectItem[];
  cidades: SelectItem[];

  estadoSelecionado: number;

  constructor(
    private cidadesService: CidadesService,
    private errorHandlerService: ErrorHandlerService,
    private estadosService: EstadosService,
    private pessoaService: PessoasService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.carregarEstados();

    const codigo = this.route.snapshot.params['codigo'];

    if (codigo) {
      this.carregarPessoa(codigo);
    } else {
      this.atualizarTitulo();
    }
  }

  carregarEstados() {
    this.estadosService.listarTodos()
      .then(estados => {
        estados.sort(Estado.porNome);
        this.estados = estados.map(e => ({ label: e.nome, value: e.codigo }));
      });
  }

  carregarCidades() {
    this.cidadesService.buscarPorEstado(this.estadoSelecionado)
      .then(cidades => this.cidades = cidades.map(c => ({ label: c.nome, value: c.nome})));
  }

  salvar(form: FormControl) {
    if (this.estadoSelecionado) {
      this.estadosService.buscaPorCodigo(this.estadoSelecionado)
        .then(estado => {
          this.pessoa.endereco.estado = estado;

          if (this.isEditando()) {
            this.atualizarPessoa(form);
          } else {
            this.criarPessoa(form);
          }
        });
    } else {
      this.pessoa.endereco.estado = null;

      if (this.isEditando()) {
        this.atualizarPessoa(form);
      } else {
        this.criarPessoa(form);
      }
    }

  }

  novo(form: FormControl) {
    form.reset();
    this.pessoa = new Pessoa();

    this.router.navigate(['/pessoas/novo']);
  }

  get titulo(): string {
    return `${this.isEditando() ? 'Editar' : 'Nova'} Pessoa`;
  }

  private isEditando(): boolean {
    return Boolean(this.pessoa.codigo);
  }

  private carregarPessoa(codigo: any) {
    this.pessoaService.buscaPeloCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTitulo();

        this.estadoSelecionado = pessoa.endereco.estado ? pessoa.endereco.estado.codigo : null;

        if (this.estadoSelecionado) {
          this.carregarCidades();
        }
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  private atualizarTitulo() {
    this.title.setTitle(`${this.isEditando() ? 'Edição de' :  'Nova'} Pessoa`);
  }

  private atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(() => {
        this.router.navigate(['/pessoas']);
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  private criarPessoa(form: FormControl) {
    this.pessoaService.criar(this.pessoa)
      .then(pessoa => {
        form.reset();
        this.pessoa = new Pessoa();

        this.messageService.add({severity: 'success', summary: 'Confirmação', detail: 'Pessoa criada com sucesso.'});

        this.router.navigate(['/pessoas']);
      })
      .catch(error => this.errorHandlerService.handle(error));
  }
}
