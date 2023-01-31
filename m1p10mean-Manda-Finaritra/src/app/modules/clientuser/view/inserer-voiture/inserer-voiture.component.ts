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
  lisetVoitureTemp!: Voiture;
  prixFinalTemp!: number;
  userCache = new User();
  oneUser!: User;
  listeVoitureUser!: User;


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private formVoiture: FormBuilder,
    private userService: UserService,
    private authentificationService: AuthentificationService,
    private atelierService: AtelierService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.initForm(new Voiture());
    this.initData();
  }

  initData() {
    const user: User | undefined = this.authentificationService.getUser();
    if (user) {
      this.oneUser = user;
      console.log("Temp voiture: ",this.lisetVoitureTemp);
      this.lisetVoiture = this.oneUser.voiture;
      console.log("Form:", this.voitureForm.value);
      this.lisetVoitureTemp = this.voitureForm.value;
      if(this.voitureForm.value){
        console.log("Miditra ato");
        if(this.lisetVoitureTemp.marque){
          this.lisetVoiture.push(this.lisetVoitureTemp);
        }
      }
    }
    if (user) {
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

  initFormVoiture(voiture: Voiture): void {
    this.voitureForm = this.formVoiture.group({
      _id: [voiture._id],
      immatriculation: [voiture.immatriculation, [Validators.required]],
      marque: [voiture.marque, [Validators.required]],
      modele: [voiture.modele],
      materiel: [voiture.materiel],
      estDansLeGarage: [voiture.estDansLeGarage],
      dateEntrerGarage: [voiture.dateEntrerGarage],
      dateSortieGarage: [voiture.dateSortieGarage],
      estTerminer: [voiture.estTerminer],
      bonDeSortie: [voiture.bonDeSortie],
      payer: [voiture.payer],
      estPayer: [voiture.estPayer]
    });
    console.log(this.voitureForm.value.materiel);
  }

  ajouterVoiture() {
    const user: User | undefined = this.authentificationService.getUser();
    console.log(user?._id);

    if (this.voitureForm.valid) {
      if (user) {
        this.loader = true;        
        this.userService.addCar(this.voitureForm.value, user._id).subscribe(res => {
          this.loader = false;
          if (res) {
            this.toastr.success('La voiture a été ajouté');
            this.lisetVoiture.push(this.voitureForm.value);
            this.lisetVoitureTemp = this.voitureForm.value;
            this.initData();
          } else {
            this.toastr.error(res);
          }
        }, error => {
          this.loader = false;
        });
      }

    }
  }

  getEtatVoiture(estDansLeGarage: boolean, estTerminer: boolean) {
    let retour = "";
    if (estDansLeGarage == true && estTerminer == false) {
      retour = "Dans le garage";
    }
    else if (estDansLeGarage == true && estTerminer == true) {
      retour = "Terminé";
    }
    else {
      retour = "En cours de traitement";
    }
    return retour;
  }

  getProgression(materiel: Materiel[]) {
    let evolutionFinal = 0;
    let evolutionTotal = materiel.length;
    let evolution = 0;
    for (let index = 0; index < materiel.length; index++) {
      if (materiel[index].estReparer == true) {
        evolution += 1;
      }
    }
    evolutionFinal = (evolution * 100) / evolutionTotal;
    if (evolution) {
      return evolutionFinal.toFixed(2);
    }
    return 0;
  }

  lougout() {
    const isLoggedOut = this.authentificationService.loggedOut();
    this.router.navigate(['login']);
    if (isLoggedOut) {
      this.router.navigate(['login']);
    }
  }

  toHome() {
    this.router.navigate(['clientuser']);
  }

  payerFacture(idVoiture: string) {
    this.loader = true;
    console.log(idVoiture);
    this.atelierService.changeStatesPayer(this.userCache, idVoiture).subscribe(res => {
      this.loader = false;
      if (res) {
        this.toastr.success("Facture payé");
        this.ngOnInit();
        this.closeModalBonDeSortie();
      } else {
        this.toastr.error(res);
      }
    }, error => {
      this.loader = false;
    });
  }

  getTotal(prix: Materiel[]) {
    console.log(prix);
    let total = 0;
    for (let index = 0; index < prix.length; index++) {
      total = total + prix[index].prixReparation;
    }
    return total;
  }

  closeModalBonDeSortie() {
    const btn = document.getElementById('modalBonDeSortie');
    if (btn) {
      btn.click();
    }
  }
}
