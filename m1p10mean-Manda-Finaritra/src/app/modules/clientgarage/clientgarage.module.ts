import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientgarageRoutingModule } from './clientgarage-routing.module';
import { AccueilClientComponent } from './view/accueil-client/accueil-client.component';
import { SharedModule } from '../shared/shared.module';
import { ReparerVoitureComponent } from './view/reparer-voiture/reparer-voiture.component';
import { ListeVoitureComponent } from './view/liste-voiture/liste-voiture.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AccueilClientComponent,
    ReparerVoitureComponent,
    ListeVoitureComponent
  ],
  imports: [
    CommonModule,
    ClientgarageRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ClientgarageModule { }
