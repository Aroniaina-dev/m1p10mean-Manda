import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientGuardGuard } from 'src/app/guard/clietnGuard/client-guard.guard';
import { ListePaiementComponent } from './view/liste-paiement/liste-paiement.component';
import { StatComponent } from './view/stat/stat.component';

const routes: Routes = [
  { path: '', component: ListePaiementComponent, canActivate: [ClientGuardGuard] },
  { path: 'stat', component: StatComponent, canActivate: [ClientGuardGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancierRoutingModule { }
