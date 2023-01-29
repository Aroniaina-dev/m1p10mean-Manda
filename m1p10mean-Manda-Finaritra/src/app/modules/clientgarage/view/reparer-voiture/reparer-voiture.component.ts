import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/ClientService/client.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { AuthentificationService } from 'src/app/services/AuthentificationService/authentification.service';


@Component({
  selector: 'app-reparer-voiture',
  templateUrl: './reparer-voiture.component.html',
  styleUrls: ['./reparer-voiture.component.css']
})
export class ReparerVoitureComponent implements OnInit {

  marque!: string;
  modele!: string;
  type!: string;
  year : number = 2022;

  constructor(private clientService: ClientService, private authentificationService: AuthentificationService,
    private router: Router) { }
  ngOnInit(): void {
    console.log("mande le code")
    const user = this.authentificationService.getUser();
    console.log(user);
  }

  onMarque(marque : string){
    this.modele = marque;
  }

  onType(type : string){
    this.type = type;
  }

  onYear(year : number){
    this.year = year;
  }


  lougout() {
    const isLoggedOut = this.authentificationService.loggedOut();
    this.router.navigate(['login']);
    if (isLoggedOut) {
      this.router.navigate(['login']);
    }
  }

  clickme(marque:string, types:string, modele:string, year:string) {
    console.log('it does nothing',marque);
    console.log('it does nothing',types);
    console.log('it does nothing',modele);
    console.log('it does nothing',year);
  }

    reparer(marque:string, types:string, matricule:string, year:string):void {
    this.clientService.depot(new Car('', marque,  types, Number(year), matricule,'0'))
      .subscribe(data => {
        console.log(data);
        console.log('lasa');
      } ,error => {
        if(error.status == 403){
          localStorage.removeItem("token");
          this.router.navigate(['clientgarage']);
        }
      } );
    this.router.navigate(['Client/Reparation']);
  }

}
