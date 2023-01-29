import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { SignUpComponent } from './view/sign-up/sign-up.component';
import { CanActivatNoConnectionGuard } from '../../guard/no-connection/can-activat-no-connection.guard';
import { LoginclientComponent } from './view/loginclient/loginclient.component';
import { SignUpClientComponent } from './view/sign-up-client/sign-up-client.component';
import { ClientGuardGuard } from 'src/app/guard/clietnGuard/client-guard.guard';


const routes: Routes = [
  { path: '', component: LoginclientComponent},
  { path: 'signUpClient', component: SignUpClientComponent},
  { path: 'admin', component: LoginComponent, canActivate: [CanActivatNoConnectionGuard] },
  { path: 'signUp', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthentificationRoutingModule { }
