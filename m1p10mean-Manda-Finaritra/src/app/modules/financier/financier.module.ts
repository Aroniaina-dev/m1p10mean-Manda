import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancierRoutingModule } from './financier-routing.module';
import { ListePaiementComponent } from './view/liste-paiement/liste-paiement.component';
import { StatComponent } from './view/stat/stat.component';
import { SharedModule } from '../shared/shared.module';
import * as CanvasJSAngularChart from '../../../../src/assets/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;


@NgModule({
  declarations: [
    ListePaiementComponent,
    StatComponent,
    CanvasJSChart
  ],
  imports: [
    CommonModule,
    FinancierRoutingModule,
    SharedModule
  ]
})
export class FinancierModule { }
