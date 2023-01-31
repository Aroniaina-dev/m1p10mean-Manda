import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilclientComponent } from '../clientuser/view/accueilclient/accueilclient.component';
import { InsererVoitureComponent } from './view/inserer-voiture/inserer-voiture.component';
import { ClientGuardGuard } from 'src/app/guard/clietnGuard/client-guard.guard';


const routes: Routes = [
  { path: '', component: AccueilclientComponent, canActivate: [ClientGuardGuard]},
  { path: 'inserer_voiture', component: InsererVoitureComponent, canActivate: [ClientGuardGuard]},
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
