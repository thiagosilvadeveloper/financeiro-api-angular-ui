import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { CategoriasService } from 'src/app/categorias/categorias.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentosService } from './../lancamentos.service';
import { PessoasService } from './../../pessoas/pessoas.service';

import { ActivatedRoute, Router } from '@angular/router';

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

  categorias = [];
  pessoas = [];

  formulario: FormGroup;

  efetuandoUpload = false;

  constructor(
    private categoriasService: CategoriasService,
    private errorHandlerService: ErrorHandlerService,
    private formBuilder: FormBuilder,
    private lancamentoService: LancamentosService,
    private messageService: MessageService,
    private pessoaService: PessoasService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.configurarFormulario();

    const codigo = this.route.snapshot.params['codigo'];
    if (codigo) {
      this.carregarLancamento(codigo);
    } else {
      this.atualizarTitulo();
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }

  salvar() {
    if (this.isEditando()) {
      this.atualizar();
    } else {
      this.criar();
    }
  }

  novo() {
    this.configurarFormulario();

    this.router.navigate(['/lancamentos/novo']);
  }

  beforeUpload() {
    this.efetuandoUpload = true;
  }

  afterUpload(event) {
    const resposta = event.originalEvent.body;
    this.formulario.patchValue({
      anexo: resposta.nome,
      urlAnexo: resposta.url
    });

    this.efetuandoUpload = false;
  }

  uploadErrorHandler(event) {
    this.errorHandlerService.handle('Ocorreu um erro ao tentar efetuar o upload do arquivo');
    this.efetuandoUpload = false;
  }

  removerAnexo() {
    this.formulario.patchValue({
      anexo: null,
      urlAnexo: null
    });
  }

  get nomeAnexo() {
    const nomeAnexo = this.formulario.get('anexo').value;
    return nomeAnexo.substring(nomeAnexo.indexOf('_') + 1, nomeAnexo.length);
  }

  get urlUploadAnexo() {
    return this.lancamentoService.lancamentosAnexoUrl;
  }

  get titulo(): string {
    return `${this.isEditando() ? 'Editar' : 'Novo'} Lançamento`;
  }

  private configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: [ 'RECEITA', Validators.required ],
      dataVencimento: [ null, Validators.required ],
      dataPagamento: [],
      descricao: [null, [ this.validarObrigatoriedade, this.validarTamanhoMinimo(5) ]],
      valor: [ null, Validators.required ],
      pessoa: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      observacao: [],
      anexo: [],
      urlAnexo: []
    });
  }

  private atualizarTitulo() {
    this.title.setTitle(`${this.isEditando() ? 'Edição de ' : 'Novo'} Lançamento`);
  }

  private atualizar() {
    this.lancamentoService.atualizar(this.formulario.value)
      .then(() => this.router.navigate(['/lancamentos']) );
  }

  private criar() {
    this.lancamentoService.criar(this.formulario.value)
      .then(lancamento => {
        this.messageService.add({severity: 'success', summary: 'Confirmação', detail: 'Lançamento criado com sucesso.'});

        this.router.navigate(['/lancamentos']);
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  private isEditando(): boolean {
    return Boolean(this.formulario.get('codigo').value);
  }

  private carregarLancamento(codigo: number) {
    this.lancamentoService.buscaPeloCodigo(codigo)
      .then(lancamento => {
        this.formulario.patchValue(lancamento);
        this.atualizarTitulo();
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  private carregarPessoas() {
    this.pessoaService.listarTodas()
      .then(resposta => {
        this.pessoas = resposta.pessoas.map(p => ({ label: p.nome, value: p.codigo }));
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  private carregarCategorias() {
    this.categoriasService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(error => this.errorHandlerService.handle(error));
  }
}
