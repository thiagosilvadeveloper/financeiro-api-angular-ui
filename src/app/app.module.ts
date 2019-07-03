import { CommonModule } from '@angular/common';
import { CoreModule } from './core/core.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RelatoriosModule } from './relatorios/relatorios.module';

import { AppComponent } from './app.component';
import { SegurancaModule } from './seguranca/seguranca.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    DashboardModule,
    FormsModule,
    LancamentosModule,
    PessoasModule,
    SegurancaModule,
    AppRoutingModule,
    RelatoriosModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
