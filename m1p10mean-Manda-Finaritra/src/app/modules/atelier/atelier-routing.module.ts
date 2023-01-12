import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeAtelierComponent } from './view/liste-atelier/liste-atelier.component';

const routes: Routes = [
  { path: '', component: ListeAtelierComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtelierRoutingModule { }
