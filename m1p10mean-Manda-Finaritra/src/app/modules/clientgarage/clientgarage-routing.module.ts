import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilClientComponent } from './view/accueil-client/accueil-client.component';
import { ReparerVoitureComponent } from './view/reparer-voiture/reparer-voiture.component';

const routes: Routes = [
  { path: '', component: AccueilClientComponent },
  { path: 'reparer', component: ReparerVoitureComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientgarageRoutingModule { }
