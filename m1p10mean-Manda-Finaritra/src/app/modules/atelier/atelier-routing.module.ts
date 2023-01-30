import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutMaterielComponent } from './view/ajout-materiel/ajout-materiel.component';
import { ListeAtelierComponent } from './view/liste-atelier/liste-atelier.component';
import { ListeVoitureComponent } from './view/liste-voiture/liste-voiture.component';

const routes: Routes = [
  { path: '', component: ListeAtelierComponent },
  { path: 'liste_voiture', component: ListeVoitureComponent },
  { path: 'ajout_materiel/:id/:idvoiture', component: AjoutMaterielComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AtelierRoutingModule { }
