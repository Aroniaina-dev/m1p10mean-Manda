import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/ClientService/client.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { FormsModule } from '@angular/forms';
import { AuthentificationService } from 'src/app/services/AuthentificationService/authentification.service';


@Component({
  selector: 'app-accueil-client',
  templateUrl: './accueil-client.component.html',
  styleUrls: ['./accueil-client.component.css']
})
export class AccueilClientComponent implements OnInit {

  marque: string[] = [];
  types: string[] = [];
  modele = 'Modèle';
  type = 'Type';

  matricule = '';

  year: number = 2022;

  event: number = new Date().getFullYear();
  arrays = Array(this.event - 1965).fill(0)
    .map((x, i) => i + 1965);

  constructor(private clientService: ClientService,private authentificationService: AuthentificationService,
    private router: Router) { }

  ngOnInit(): void {
    this.getMarque();
  }

  getMarque(): void {

    this.clientService.getMarque()
      .subscribe(data => {
        this.marque = data.body;

      }, error => {
        if (error.status == 403) {
          localStorage.removeItem("token");
          this.router.navigate(['']);
        }
      });

  }

  onMarque(marque: string) {
    this.modele = marque;
  }

  onType(type: string) {
    this.type = type;
  }

  onYear(year: number) {
    this.year = year;
  }
  getType(): void {

    this.clientService.getType(this.modele)
      .subscribe(data => {
        this.types = data.body;

      }, error => {
        if (error.status == 403) {
          localStorage.removeItem("token");
          this.router.navigate(['']);
        }
      });

  }

  reparer(): void {
    this.clientService.depot(new Car('', this.modele, this.type, this.year, this.matricule, '0'))
      .subscribe(data => {
        console.log(data);
        console.log('lasa');
      }, error => {
        if (error.status == 403) {
          localStorage.removeItem("token");
          this.router.navigate(['']);
        }
      });
    this.router.navigate(['Client/Reparation']);
  }

  lougout() {
    const isLoggedOut = this.authentificationService.loggedOut();
    this.router.navigate(['login']);
    if (isLoggedOut) {
      this.router.navigate(['login']);
    }
  }

  toTepare(){
    this.router.navigate(['/clientgarage/reparer']);
  }
}
