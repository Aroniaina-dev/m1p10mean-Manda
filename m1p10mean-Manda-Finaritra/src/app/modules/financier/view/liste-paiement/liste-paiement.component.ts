import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AtelierService } from 'src/app/services/AtelierService/atelier.service';
import { User } from 'src/app/models/user';
import { Materiel } from 'src/app/models/materiel';
import { Voiture } from 'src/app/models/voiture';

@Component({
  selector: 'app-liste-paiement',
  templateUrl: './liste-paiement.component.html',
  styleUrls: ['./liste-paiement.component.css']
})
export class ListePaiementComponent implements OnInit {

  loader: boolean = false;
  loaderView: boolean = false;
  load: boolean = false;
  dataResultUser: User[] = [];
  dataResulMateriel: Materiel[] = [];
  ListeVoiture: User[] = [];
  userForm!: FormGroup;
  voitureForm!: FormGroup;
  prixFinalTemp!: number;

  constructor(private router: Router,
    private toastr: ToastrService,
    private fB: FormBuilder,
    private formBuildreVoiture: FormBuilder,
    private atelierService: AtelierService,
    ) { 
    }

  ngOnInit(): void {
    this.initData();
    this.initForm(new User());
    this.voitureInitForm(new Voiture);
  }

  initData(): void {
    try {
      this.load = true;
      this.atelierService.getAllFinancier(0).subscribe((res) => {
        this.dataResultUser = res;
        
        for (let i = 0; i < this.dataResultUser.length; i++) {
          console.log(this.dataResultUser.length);
          for (let j = 0; j < this.dataResultUser[i].voiture.length; j++) {
            console.log(this.dataResultUser[i].voiture.length);
            if(this.dataResultUser[i].voiture[j].payer == false ){
              this.dataResultUser[i].voiture.splice(j, 1);
            }
            if (this.dataResultUser[i].voiture[j].payer == true && this.dataResultUser[i].voiture[j].estPayer == true) {
              this.dataResultUser[i].voiture.splice(j, 1);
            }
          }
          if(this.dataResultUser[i].voiture.length == 0){
            this.dataResultUser.splice(i, 1);
          }
        }
        
        this.load = false;
      });
    } catch (error) {
      alert(error);
    }
  }

  getTotal(prix: Materiel[]){
    let total = 0;
    for (let index = 0; index < prix.length; index++) {
      total = total + prix[index].prixReparation;
    }
    return total;
  }

  initForm(user: User): void {
    this.userForm = this.fB.group({
      _id: [user._id, [Validators.required]],
      nom: [user.nom, [Validators.required]],
      prenom: [user.prenom, [Validators.required]],
      email: [user.email],
      phone: [user.phone],
      loginType: [user.loginType],
      voiture: [user.voiture],
    });
  }

  voitureInitForm(voiture: Voiture): void {
    this.voitureForm = this.formBuildreVoiture.group({
      _id: [voiture._id, [Validators.required]],
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
      estPayer: [voiture.estPayer],
    });    
    this.prixFinalTemp = this.getTotal(this.voitureForm.value.materiel);
    console.log(this.prixFinalTemp);
  }

  validerPayement(user:User, idVoiture: string){
    this.loader = true;
    this.atelierService.changeStatesPayement(user,idVoiture).subscribe(res => {
      this.loader = false;
      if (res) {
        this.toastr.success("Payement accepté");
        this.closeModal();
        this.ngOnInit();
      } else {
        this.toastr.error(res);
      }
    }, error => {
      this.loader = false;
    });
  }

  closeModal(){
    const btn = document.getElementById('modalPayement');
    if (btn) {
      btn.click();
    }
  }
}
