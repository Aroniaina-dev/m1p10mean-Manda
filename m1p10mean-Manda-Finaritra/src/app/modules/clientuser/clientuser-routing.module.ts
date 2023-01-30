import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilclientComponent } from '../clientuser/view/accueilclient/accueilclient.component';
import { InsererVoitureComponent } from './view/inserer-voiture/inserer-voiture.component';


const routes: Routes = [
  { path: '', component: AccueilclientComponent },
  { path: 'inserer_voiture', component: InsererVoitureComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
    
  exports: [RouterModule],
  declarations: []
})
export class ClientuserRoutingModule { }
