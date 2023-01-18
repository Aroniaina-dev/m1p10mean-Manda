import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancierRoutingModule } from './financier-routing.module';
import { ListePaiementComponent } from './view/liste-paiement/liste-paiement.component';
import { StatComponent } from './view/stat/stat.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ListePaiementComponent,
    StatComponent
  ],
  imports: [
    CommonModule,
    FinancierRoutingModule,
    SharedModule
  ]
})
export class FinancierModule { }
