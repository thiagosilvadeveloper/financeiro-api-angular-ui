import { CoreModule } from './core/core.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    FormsModule,
    LancamentosModule,
    PessoasModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
