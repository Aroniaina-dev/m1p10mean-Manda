import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AtelierService } from 'src/app/services/AtelierService/atelier.service';
import { User } from 'src/app/models/user';
import { Voiture } from 'src/app/models/voiture';
import { Materiel } from 'src/app/models/materiel';
import jsPDF from 'jspdf';



@Component({
  selector: 'app-liste-voiture',
  templateUrl: './liste-voiture.component.html',
  styleUrls: ['./liste-voiture.component.css']
})
export class ListeVoitureComponent implements OnInit {
  timeoutHandler: any;
  user: User = new User();
  loader: boolean = false;
  loaderView: boolean = false;
  load: boolean = false;
  dataResultUser: User[] = [];
  dataResultVoitureTerminer: User[] =[];
  userForm!: FormGroup;
  emailForm!: FormGroup;
  voitureForm!: FormGroup;
  emailAddress:string="mandaaroniaina2001@gmail.com";
  emailBody:string="Manda Aroniaina";
  prixFinalTemp!: number;


  constructor(private router: Router,
    private toastr: ToastrService,
    private fB: FormBuilder,
    private formBuildreEmail: FormBuilder,
    private formBuildreVoiture: FormBuilder,
    private atelierService: AtelierService,
    ) { 
  }

  ngOnInit(): void {
    this.initForm(new User());
    this.initData();
    this.initDataVoitureTerminer();
    this.initFormEmail(new User);
    this.voitureInitForm(new Voiture);
  }

  initData(): void {
    try {
      this.load = true;
      this.atelierService.getAll(0).subscribe((res) => {
        this.dataResultUser = res;
        this.load = false;
      });
    } catch (error) {
      alert(error);
    }

    console.log(this.dataResultUser);
  }

  initDataVoitureTerminer(): void {
    try {
      this.load = true;
      this.atelierService.getAll(0).subscribe((res) => {
        this.dataResultVoitureTerminer = res;
        console.log(this.dataResultVoitureTerminer);
        this.load = false;
      });
    } catch (error) {
      alert(error);
    }
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
    console.log(this.userForm.value.nom);
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
    });    
    this.prixFinalTemp = this.getTotal(this.voitureForm.value.materiel);
    console.log(this.prixFinalTemp);
  }

  modeleEmail!: string;
  marqueEmail!: string;
  immatriculationEmail!: string;
  bodyEmail!: string;

  initFormEmail(user: User):void{
    this.emailForm = this.formBuildreEmail.group({
      _id: [user._id, [Validators.required]],
      nom: [user.nom, [Validators.required]],
      prenom: [user.prenom, [Validators.required]],
      email: [user.email],
      body: [this.bodyEmail],
      objet: ["Voiture réparé"]
    });
    console.log(this.emailForm.value);
  }

  getVoitureEmail(modele: string, marque:string, immatriculation: string){
    this.modeleEmail = modele;
    this.marqueEmail = marque;
    this.immatriculationEmail = immatriculation;
    this.bodyEmail = "La voiture "+this.modeleEmail+" "+this.marqueEmail+" "+ this.immatriculationEmail +" est terminée. Veuillez la récupéré";
  }

  onItemSelector(value :any) {
    console.log(value);
  }

  name: number = 0;

  public mouseup() {
    if (this.timeoutHandler) {
      clearInterval(this.timeoutHandler);
      this.name = 0;
      this.timeoutHandler = null;
    }
  }

  public mousedown(user:User) {
    console.log(user._id);
    this.user = user;
  }

  droppedItems: Voiture[] = [];
  onItemDrop(e: any) {
    let estNonReparer = 0;
    console.log(this.user);
    console.log(e.dragData);
    for(let i=0; i<e.dragData.materiel.length; i++){
      console.log(e.dragData.materiel[i]["estReparer"]);
      if(e.dragData.materiel[i].estReparer == false){
        estNonReparer +=1;
        break;
      }
    }
    if(estNonReparer>0){
      this.toastr.warning('Il y a encore des matériels qui ne sont pas réparé');  
    }else{
      this.atelierService.changeStatesTerminer(this.user, e.dragData._id).subscribe(res => {
        this.loader = false;
        if (!res.error) {
          this.toastr.success("Voiture terminée");
          this.dataResultVoitureTerminer.push(e.dragData);
          this.ngOnInit();
          this.initData();
          this.closeModal();
        } else {
          this.toastr.error(res.message);
        }
      }, error => {
        this.loader = false;
      });
    }
  }

  closeModal() {
    const btn = document.getElementById('modalEmail');
    if (btn) {
      btn.click();
    }
  }

  closeModalBonDeSortie() {
    const btn = document.getElementById('modalBonDeSortie');
    if (btn) {
      btn.click();
    }
  }



  getUserCheck(id: string) {
    this.router.navigate(['/admin/children/' + id]);
  }

  refresh(): void {
    window.location.reload();
  }

  reparer(user:User, idVoiture: string, idMateriel: string){
    this.loader = true;
    this.atelierService.changeStatesReparer(user, idVoiture, idMateriel).subscribe(res => {
      this.loader = false;
      if (res) {
        this.toastr.success('Le matériel a été réparé');
        this.ngOnInit();
        this.closeModal();
      } else {
        this.toastr.error(res);
      }
    }, error => {
      this.loader = false;
    });
  }

  envoyerEmail(){
    try {
      this.load = true;
      this.atelierService.sendEmail(this.emailAddress, this.emailForm.value.objet,this.emailForm.value.body).subscribe((res) => {
        this.toastr.success('Email bien envoyé');
        this.closeModal();
        this.load = false;
      });
    } catch (error) {
      alert(error);
    }
  }

  get c(): any {
    return this.emailForm.controls;
  }

  get u(): any {
    return this.userForm.controls;
  }
  

  getProgression(materiel: Materiel[]){
    let evolutionFinal = 0;
    let evolutionTotal = materiel.length;
    
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

  validerBonDeSortie(user:User, idVoiture: string){
    this.loader = true;
    this.atelierService.changeStatesBonDeSortie(user,idVoiture).subscribe(res => {
      this.loader = false;
      if (res) {
        this.toastr.success("Bon de sortie accepté");
        this.ngOnInit();
        this.closeModalBonDeSortie();
      } else {
        this.toastr.error(res);
      }
    }, error => {
      this.loader = false;
    });
  }

 @ViewChild('content') content!: ElementRef;
 savePdf() {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pdfTable = this.content.nativeElement;
  doc.html(pdfTable.innerHTML, {
    callback(rst) {
      rst.save('one.pdf');
    },
  });
}
}
