import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

import { SharedModule } from '../shared/shared.module';
import { PessoasService } from './pessoas.service';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoaCadastroContatosComponent } from './pessoa-cadastro-contatos/pessoa-cadastro-contatos.component';
import { EstadosService } from '../estados/estados.service';
import { CidadesService } from './../cidades/cidades.service';

@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent,
    PessoaCadastroContatosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    ButtonModule,
    DialogModule,
    DropdownModule,
    InputMaskModule,
    InputTextModule,
    InputTextareaModule,
    MessageModule,
    PanelModule,
    SelectButtonModule,
    TableModule,
    TooltipModule,

    SharedModule,
    PessoasRoutingModule
  ],
  providers: [
    CidadesService,
    EstadosService,
    PessoasService
  ],
  exports: []
})
export class PessoasModule { }
