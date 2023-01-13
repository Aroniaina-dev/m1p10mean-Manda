import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtelierRoutingModule } from './atelier-routing.module';
import { ListeAtelierComponent } from './view/liste-atelier/liste-atelier.component';
import { ListeVoitureComponent } from './view/liste-voiture/liste-voiture.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ListeAtelierComponent,
    ListeVoitureComponent,
  ],
  imports: [
    CommonModule,
    AtelierRoutingModule,
    SharedModule
  ]
})
export class AtelierModule { }
