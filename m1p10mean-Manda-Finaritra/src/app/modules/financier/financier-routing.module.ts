import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListePaiementComponent } from './view/liste-paiement/liste-paiement.component';
import { StatComponent } from './view/stat/stat.component';

const routes: Routes = [
  { path: '', component: ListePaiementComponent },
  { path: 'stat', component: StatComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancierRoutingModule { }
