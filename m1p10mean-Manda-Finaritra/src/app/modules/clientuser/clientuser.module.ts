import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientuserRoutingModule } from './clientuser-routing.module';
import { AccueilclientComponent } from './view/accueilclient/accueilclient.component';
import { InsererVoitureComponent } from './view/inserer-voiture/inserer-voiture.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AccueilclientComponent,
    InsererVoitureComponent
  ],
  imports: [
    CommonModule,
    ClientuserRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AccueilclientComponent,InsererVoitureComponent]
})
export class ClientuserModule { }
