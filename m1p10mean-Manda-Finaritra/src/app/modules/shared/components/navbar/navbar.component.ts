import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../../../../models/user";
import { AuthentificationService } from 'src/app/services/AuthentificationService/authentification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authentificationService: AuthentificationService, private router: Router) { }
  user: User = new User();
  ngOnInit(): void {
    this.initUser();
  }

  initUser() {
    const tempUser = this.authentificationService.getUser();
    if (tempUser) {
      this.user = tempUser;
    }
  }

  lougout() {
    const isLoggedOut = this.authentificationService.loggedOut();
    console.log(isLoggedOut);
    this.router.navigate(['admin/login']);
    if (isLoggedOut) {
      this.router.navigate(['admin/login']);
    }
  }
  clickToggled(): void {
    const btn = document.getElementById('sidebarToggle');
    if (btn) {
      btn.click();
    }
  }
  onclickProfil() {
    // this.router.navigate(['/admin/mon-profile']);
  }
}
