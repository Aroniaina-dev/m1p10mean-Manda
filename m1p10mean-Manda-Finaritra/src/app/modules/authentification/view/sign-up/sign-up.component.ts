import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Voiture } from 'src/app/models/voiture';
import { AuthentificationService } from 'src/app/services/AuthentificationService/authentification.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  currentDate = new Date();
  loader = false;
  load = true;
  formGroup !: FormGroup;


  nom: string = "";
  prenom: string = "";
  email: string = "";
  password: string = "";
  phone: string = "";
  loginType: string = "0";
  voiture: Voiture[] = [];



  constructor(private router: Router, private signUpService: AuthentificationService, private readonly fb: FormBuilder, private toastr: ToastrService) { }

  onSelected(value: string): void {
    console.log(value)
    this.loginType = value;
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      nom: [this.nom, Validators.required],
      prenom: [this.prenom, Validators.required],
      email: [this.email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [this.password, Validators.required],
      phone: [this.phone],
      loginType: [this.loginType, Validators.required],
      voiture: [this.voiture],
    });
  }

  get c(): any {
    return this.formGroup.controls;
  }

  login() {
    this.router.navigate(['/']);
  }

  signUp(): void {
    if (this.formGroup.valid) {
      this.loader = true;
      this.signUpService.signUp(this.formGroup.value).subscribe(res => {
        this.loader = false;
        if (!res.error) {
          this.toastr.success('Vous êtes inscrit');
          this.router.navigate(['/']);
        }
      }, error => {
        this.loader = false;
        this.toastr.error(error.error.msg);
      });
    } else {
      this.toastr.warning("Un des format de vos champs est incorrect");
    }
  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(this.formGroup.value);
    };
  }

}
