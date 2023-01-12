import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtelierRoutingModule } from './atelier-routing.module';
import { ListeAtelierComponent } from './view/liste-atelier/liste-atelier.component';


@NgModule({
  declarations: [
    ListeAtelierComponent
  ],
  imports: [
    CommonModule,
    AtelierRoutingModule
  ]
})
export class AtelierModule { }
