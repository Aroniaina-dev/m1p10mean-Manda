import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AtelierService } from 'src/app/services/AtelierService/atelier.service';
import { User } from 'src/app/models/user';
import { Materiel } from 'src/app/models/materiel'


@Component({
  selector: 'app-liste-voiture',
  templateUrl: './liste-voiture.component.html',
  styleUrls: ['./liste-voiture.component.css']
})
export class ListeVoitureComponent implements OnInit {
  droppedItems = [{name: "", type: ""}];

   items = [
     {name: "Apple", type: "fruit"},
     {name: "Carrot", type: "vegetable"},
     {name: "Orange", type: "fruit"}];
     
     onItemDrop(e: any) {
     // Get the dropped data here
     console.log(e.dragData);
     this.droppedItems.push(e.dragData);
     }


  loader: boolean = false;
  loaderView: boolean = false;
  load: boolean = false;
  dataResultUser: User[] = [];
  dataResulMateriel: Materiel[] = [];
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
    
  }

  getUserCheck(id: string) {
    this.router.navigate(['/admin/children/' + id]);
  }

  reparer(user:User, idVoiture: string, idMateriel: string){
    console.log(idVoiture);
    console.log(idMateriel);
    
    this.loader = true;
    this.atelierService.changeStatesReparer(user, idVoiture, idMateriel).subscribe(res => {
      this.loader = false;
      if (!res.error) {
        this.toastr.success('Le matériel a été réparé');
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
