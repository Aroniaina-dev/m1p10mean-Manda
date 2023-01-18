import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthentificationService } from 'src/app/services/AuthentificationService/authentification.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  minify = false;
  user: User = new User();
  constructor(private authentificationService: AuthentificationService) { }

  ngOnInit(): void {
    this.initUser();
  }


  initUser() {
    const tempUser = this.authentificationService.getUser();
    if (tempUser) {
      this.user = tempUser;
    }
  }
}
