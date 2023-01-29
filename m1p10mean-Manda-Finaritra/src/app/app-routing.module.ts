import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:  "", pathMatch:  "full",redirectTo:  "login"},
  {
    path: 'login',
    loadChildren: () => import('./modules/authentification/authentification.module').then(m => m.AuthentificationModule)
  },
  {
    path: 'ateliergarage',
    loadChildren: () => import('./modules/ateliergarage/ateliergarage.module').then(m => m.AteliergarageModule)
  },
  {
    path: 'garage',
    loadChildren: () => import('./modules/garage/garage-routing.module').then(m => m.GarageRoutingModule)
  },
  {
    path: 'atelier',
    loadChildren: () => import('./modules/atelier/atelier.module').then(m => m.AtelierModule)
  },
  {
    path: 'clientgarage',
    loadChildren: () => import('./modules/clientgarage/clientgarage-routing.module').then(m => m.ClientgarageRoutingModule)
  },
  {
    path: 'financier',
    loadChildren: () => import('./modules/financier/financier.module').then(m => m.FinancierModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
