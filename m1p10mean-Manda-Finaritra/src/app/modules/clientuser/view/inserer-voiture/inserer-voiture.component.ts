import { Component, OnInit } from '@angular/core';
import { Materiel } from 'src/app/models/materiel';
import { Voiture } from 'src/app/models/voiture';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthentificationService } from 'src/app/services/AuthentificationService/authentification.service';
import { AtelierService } from 'src/app/services/AtelierService/atelier.service';
import { UserService } from 'src/app/services/UserService/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';



@Component({
  selector: 'app-inserer-voiture',
  templateUrl: './inserer-voiture.component.html',
  styleUrls: ['./inserer-voiture.component.css']
})
export class InsererVoitureComponent implements OnInit {
  immatriculation!: string;
  marque!: string;
  modele!: string;
  materiel: Materiel[] = [];
  estDansLeGarage = false;
  dateEntrerGarage!: Date;
  dateSortieGarage!: Date;
  estTerminer = false;
  bonDeSortie = false;
  payer = false;
  estPayer = false;
  voitureForm!: FormGroup;
  loader: boolean = false;
  lisetVoiture!: Voiture[];
  prixFinalTemp!: number;
  userCache = new User();


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private authentificationService: AuthentificationService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.initForm(new Voiture());
    const user: User | undefined = this.authentificationService.getUser();
    if(user){
      console.log(user);
      this.lisetVoiture = user.voiture;
      console.log(this.lisetVoiture);
    }
    if(user){
      this.userCache = user;
    }
  }

  initForm(voiture: Voiture): void {
    this.voitureForm = this.fb.group({
      immatriculation: [this.immatriculation, [Validators.required]],
      marque: [this.marque, [Validators.required]],
      modele: [this.modele],
      materiel: [this.materiel],
      estDansLeGarage: [this.estDansLeGarage],
      dateEntrerGarage: [this.dateEntrerGarage],
      dateSortieGarage: [this.dateSortieGarage],
      estTerminer: [this.estTerminer],
      bonDeSortie: [this.bonDeSortie],
      payer: [this.payer],
      estPayer: [this.estPayer]
    });
  }

  ajouterVoiture() {
    const user: User | undefined = this.authentificationService.getUser();
    console.log(user?._id);

    if (this.voitureForm.valid) {
      if(user){
        this.loader = true;
        this.userService.addCar(this.voitureForm.value, user._id).subscribe(res => {
          this.loader = false;
          if (!res.error) {
            this.toastr.success('La voiture a été ajouté');
            this.ngOnInit();
          } else {
            this.toastr.error(res.message);
          }
        }, error => {
          this.loader = false;
        });
      }
      
    }
  }

  getEtatVoiture(estDansLeGarage:boolean, estTerminer: boolean){
    let retour = "";
    if(estDansLeGarage == true && estTerminer ==false){
      retour = "Dans le garage";
    }
    else if(estDansLeGarage == true && estTerminer ==true){
      retour = "Terminé";
    }
    else{
      retour = "En cours de traitement";
    }
    return retour;
  }

  getProgression(materiel: Materiel[]){
    let evolutionFinal = 0;
    let evolutionTotal = materiel.length;
    console.log(materiel);
      let evolution = 0;
    for (let index = 0; index < materiel.length; index++) {
      if(materiel[index].estReparer == true){
        evolution += 1;
      }
    }
    evolutionFinal = (evolution * 100) /evolutionTotal;
    return evolutionFinal.toFixed(2);
  }

  getTotal(prix: Materiel[]){
    let total = 0;
    for (let index = 0; index < prix.length; index++) {
      total = total + prix[index].prixReparation;
    }
    return total;
  }

  lougout() {
    const isLoggedOut = this.authentificationService.loggedOut();
    this.router.navigate(['login']);
    if (isLoggedOut) {
      this.router.navigate(['login']);
    }
  }

  toHome(){
    this.router.navigate(['clientuser']);
  }
}
