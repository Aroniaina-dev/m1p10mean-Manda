import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AtelierService } from 'src/app/services/AtelierService/atelier.service';
import { User } from 'src/app/models/user';
import { Materiel } from 'src/app/models/materiel';
import { Voiture } from 'src/app/models/voiture';

@Component({
  selector: 'app-liste-atelier',
  templateUrl: './liste-atelier.component.html',
  styleUrls: ['./liste-atelier.component.css']
})
export class ListeAtelierComponent implements OnInit {

  loader: boolean = false;
  loaderView: boolean = false;
  load: boolean = false;
  dataResultUser: User[] = [];
  dataResulMateriel: Materiel[] = [];
  ListeVoiture: User[] = [];
  userForm!: FormGroup;


  constructor(private router: Router,
    private toastr: ToastrService,
    private fB: FormBuilder,
    private atelierService: AtelierService
    ) { }

  ngOnInit(): void {
    this.initForm(new User());
    this.initData();
  }

  initData(): void {
    try {
      this.load = true;
      this.atelierService.getAll(0).subscribe((res) => {
        this.dataResultUser = res;
        console.log(res);
        for (let i = 0; i < this.dataResultUser.length; i++) {
          for (let j = 0; j < this.dataResultUser[i].voiture.length; j++) {
            if(this.dataResultUser[i].voiture[j].estDansLeGarage == true){
              this.dataResultUser[i].voiture.splice(j, 1);
              // console.log(i,"-",j);
              console.log(this.dataResultUser[i].voiture);
            }
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

  addToGarage(user:User, idVoiture: string){
    this.loader = true;
      this.atelierService.changeStatesGarage(user, idVoiture).subscribe(res => {
        this.loader = false;
        if (!res.error) {
          this.toastr.success('La voiture a été enregistrer dans le garage');
          this.initData();
          this.closeModal();
        } else {
          this.toastr.error(res.message);
        }
      }, error => {
        this.loader = false;
      });
  }

  closeModal() {
    const btn = document.getElementById('updateCloseModal');
    if (btn) {
      btn.click();
    }
  }

  closeModalDelete() {
    const btn = document.getElementById('deleteCloseModal');
    if (btn) {
      btn.click();
    }
  }

  noDelete() {
    const btn = document.getElementById('deleteCloseModal');
    if (btn) {
      btn.click();
    }
  }

  delete() {
    // if (this.droitForm.valid) {
    //   this.loader = true;
    //   const droit: Droit = this.droitForm.value;
    //   this.droitService.delete(droit._id).subscribe(res => {
    //     this.loader = false;
    //     if (!res.error) {
    //       this.toastr.success('Le droit a été supprimé');
    //       this.initData();
    //       this.closeModalDelete();
    //     } else {
    //       this.toastr.error(res.message);
    //     }
    //   }, error => {
    //     this.loader = false;
    //   });
    // }
  }

  getUserCheck(id: string) {
    this.router.navigate(['/admin/children/' + id]);
  }

}
