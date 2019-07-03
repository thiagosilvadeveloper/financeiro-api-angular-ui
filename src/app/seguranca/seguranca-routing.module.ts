import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RelatorioLancamentosComponent } from '../relatorios/relatorio-lancamentos/relatorio-lancamentos.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'acesso-negado', component: AcessoNegadoComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SegurancaRoutingModule { }
