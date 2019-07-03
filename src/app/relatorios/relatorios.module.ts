import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';
import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';
import { RelatoriosService } from './relatorios.service';

@NgModule({
  declarations: [
    RelatorioLancamentosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    CalendarModule,

    SharedModule,
    RelatoriosRoutingModule
  ],
  providers: [
    RelatoriosService
  ]
})
export class RelatoriosModule { }
