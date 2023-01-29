import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthentificationRoutingModule } from './authentification-routing.module';
import { LoginComponent } from './view/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { SignUpComponent } from './view/sign-up/sign-up.component';
import { LoginclientComponent } from './view/loginclient/loginclient.component';
import { FormsModule } from '@angular/forms';
import { SignUpClientComponent } from './view/sign-up-client/sign-up-client.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    LoginclientComponent,
    SignUpClientComponent
  ],
  imports: [
    CommonModule,
    AuthentificationRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class AuthentificationModule { }
