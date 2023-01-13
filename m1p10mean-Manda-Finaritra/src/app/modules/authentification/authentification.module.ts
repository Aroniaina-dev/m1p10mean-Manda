import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthentificationRoutingModule } from './authentification-routing.module';
import { LoginComponent } from './view/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { SignUpComponent } from './view/sign-up/sign-up.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    AuthentificationRoutingModule,
    SharedModule
  ]
})
export class AuthentificationModule { }
