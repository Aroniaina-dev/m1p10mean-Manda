import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AtelierService } from 'src/app/services/AtelierService/atelier.service';
import { User } from 'src/app/models/user';
import { Voiture } from 'src/app/models/voiture';
import { HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';


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
  emailAddress:string="mandaaroniaina2001@gmail.com";
  emailBody:string="Manda Aroniaina";


  constructor(private router: Router,
    private toastr: ToastrService,
    private fB: FormBuilder,
    private formBuildreEmail: FormBuilder,
    private atelierService: AtelierService
    ) { 
  }

  ngOnInit(): void {
    this.initForm(new User());
    this.initData();
    this.initDataVoitureTerminer();
    this.initFormEmail();
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
  }

  initFormEmail():void{
    this.emailForm = this.formBuildreEmail.group({
      emailAddress: [this.emailAddress, [Validators.compose([Validators.required, Validators.email])]],
      emailBody: [this.emailBody]
    });
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


  getUserCheck(id: string) {
    this.router.navigate(['/admin/children/' + id]);
  }

  reparer(user:User, idVoiture: string, idMateriel: string){
    this.loader = true;
    this.atelierService.changeStatesReparer(user, idVoiture, idMateriel).subscribe(res => {
      this.loader = false;
      if (!res.error) {
        this.toastr.success('Le matériel a été réparé');
        this.ngOnInit();
        // this.initData();
        this.closeModal();
      } else {
        this.toastr.error(res.message);
      }
    }, error => {
      this.loader = false;
    });
  }

  envoyerEmail(){
    try {
      this.load = true;
      this.atelierService.sendEmail(this.emailAddress, this.emailBody).subscribe((res) => {
        this.toastr.success('Email bien envoyé');
        this.load = false;
      });
    } catch (error) {
      alert(error);
    }
  }

  get c(): any {
    return this.emailForm.controls;
  }
}
