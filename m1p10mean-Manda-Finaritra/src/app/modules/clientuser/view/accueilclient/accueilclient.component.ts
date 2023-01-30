import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AtelierService } from 'src/app/services/AtelierService/atelier.service';
import { AuthentificationService } from 'src/app/services/AuthentificationService/authentification.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-accueilclient',
  templateUrl: './accueilclient.component.html',
  styleUrls: ['./accueilclient.component.css']
})
export class AccueilclientComponent implements OnInit {

  userCache = new User();

  constructor(private router: Router,
    private toastr: ToastrService,
    private atelierService: AtelierService,
    private authentificationService: AuthentificationService
    ) { }

  ngOnInit(): void {
    const user: User | undefined = this.authentificationService.getUser();
    if(user){
      this.userCache = user;
    }
  }

  ajouterVoiture(){
    this.router.navigate(['clientuser/inserer_voiture']);
  }

  lougout() {
    const isLoggedOut = this.authentificationService.loggedOut();
    this.router.navigate(['login']);
    if (isLoggedOut) {
      this.router.navigate(['login']);
    }
  }
}
