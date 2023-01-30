import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ConfirmationDeleteModalComponent } from './components/confirmation-delete-modal/confirmation-delete-modal.component';
import { HeaderclientComponent } from './components/headerclient/headerclient.component';
import { FooterclientComponent } from './components/footerclient/footerclient.component';



@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    ConfirmationDeleteModalComponent,
    HeaderclientComponent,
    FooterclientComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    SidebarComponent,
    FooterComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    NavbarComponent,
    ConfirmationDeleteModalComponent,
    HeaderclientComponent,
    FooterclientComponent
  ]
})
export class SharedModule { }
