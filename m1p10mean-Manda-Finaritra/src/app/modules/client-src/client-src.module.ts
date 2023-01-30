import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientSrcRoutingModule } from './client-src-routing.module';
import { AccueilComponent } from './view/accueil/accueil.component';
import { InsertCarComponent } from './view/insert-car/insert-car.component';


@NgModule({
  declarations: [
    AccueilComponent,
    InsertCarComponent
  ],
  imports: [
    CommonModule,
    ClientSrcRoutingModule
  ]
})
export class ClientSrcModule { }
