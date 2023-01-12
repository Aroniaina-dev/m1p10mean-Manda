import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtelierRoutingModule } from './atelier-routing.module';
import { AtelierComponent } from './view/atelier/atelier.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AtelierComponent
  ],
  imports: [
    CommonModule,
    AtelierRoutingModule,
    SharedModule
  ]
})
export class AtelierModule { }
