import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AtelierService } from 'src/app/services/AtelierService/atelier.service';
import { User } from 'src/app/models/user';
import { Materiel } from 'src/app/models/materiel';
import { Voiture } from 'src/app/models/voiture';

@Component({
  selector: 'app-ajout-materiel',
  templateUrl: './ajout-materiel.component.html',
  styleUrls: ['./ajout-materiel.component.css']
})
export class AjoutMaterielComponent implements OnInit {
  _id!: string;
  designationMateriel = "Manda";
  prixReparation = 3;
  dateDebutReparation: Date = new Date();
  dateFinReparation: Date = new Date();
  estReparer: boolean = false;

  loader: boolean = false;
  loaderView: boolean = false;
  load: boolean = false;
  dataResultUser: User[] = [];
  dataResulMateriel: Materiel[] = [];
  ListeVoiture: User[] = [];
  userForm!: FormGroup;
  voiture!: Voiture;

  url!: string;
  idVoiture!: string;
  idUser!: string;
  materielForm!: FormGroup;

  constructor(private router: Router,
    private toastr: ToastrService,
    private fB: FormBuilder,
    private fBMateriel: FormBuilder,
    private atelierService: AtelierService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.url = this.router.url;
    var splitted = this.url.split("/");
    console.log(splitted[splitted.length - 1]);
    this.idVoiture = splitted[splitted.length - 1];
    this.idUser = splitted[splitted.length - 1];
    this.getTest();

  }

  initForm(): void {
    this.materielForm = this.fBMateriel.group({
      designationMateriel: [this.designationMateriel, Validators.required],
      prixReparation: [this.prixReparation, Validators.required],
      dateDebutReparation: [this.dateDebutReparation],
      dateFinReparation: [this.dateFinReparation],
      estReparer: [this.estReparer],
    });
  }


  async getTest() {
    const user = await this.atelierService.getAll(0).toPromise() as User[];
    console.log(user);
    for (let i = 0; i < user.length; i++) {
      for (let j = 0; j < user[i].voiture.length; j++) {
        if (user[i].voiture[j]._id == this.idVoiture) {
          this.voiture = user[i].voiture[j];
          this.dataResulMateriel = user[i].voiture[j].materiel;
          break;
        }
      }
    }
    console.log(this.voiture);
  }


  async ajouter() {
    const user = await this.atelierService.getAll(0).toPromise() as User[];
    let oneUser = new User();
    let idVoitureTemp = 0;
    console.log(user);
    for (let i = 0; i < user.length; i++) {
      for (let j = 0; j < user[i].voiture.length; j++) {
        if (user[i].voiture[j]._id == this.idVoiture) {
          this.voiture = user[i].voiture[j];
          oneUser = user[i];
          idVoitureTemp = j
          break;
        }
      }
    }
    this.loader = true;
    this.atelierService.addMateriel(oneUser, this.materielForm.value, oneUser._id, idVoitureTemp).subscribe(res => {
      this.loader = false;
      if (!res.error) {
        this.toastr.success('La modification a été enregistrer dans le garage');
        this.ngOnInit();
      } else {
        this.toastr.error(res.message);
      }
    }, error => {
      this.loader = false;
    });
  }

  listeReparation(){

  }

  get d(): any {
    return this.materielForm.controls;
  }
}
