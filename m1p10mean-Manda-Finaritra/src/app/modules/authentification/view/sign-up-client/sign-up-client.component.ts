import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthentificationService } from 'src/app/services/AuthentificationService/authentification.service';


@Component({
  selector: 'app-sign-up-client',
  templateUrl: './sign-up-client.component.html',
  styleUrls: ['./sign-up-client.component.css']
})
export class SignUpClientComponent implements OnInit {

  nom = 'Manda';
  prenom = 'Aroniaina';
  email = 'mandaaroniaina2001@gmail.com';
  password = '123456';
  phone = '123456';
  confirmation = '0349496013';
  loginType = 0;
  currentDate = new Date();
  loader = false;
  load = true;
  formGroup !: FormGroup;

  error: string = '';
  user = new Users(this.nom, this.prenom, this.email, this.password, this.phone,this.loginType);

  ngOnInit() {
    this.load = true;
    this.formGroup = this.fb.group({
      nom: [this.nom, Validators.required],
      prenom: [this.prenom, Validators.required],
      email: [this.email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [this.password, Validators.required],
      phone: [this.phone],
      loginType: [this.loginType],
    });
  }
  constructor(private signUpService: AuthentificationService, private toastr: ToastrService, private readonly fb: FormBuilder, private router: Router) { }

  onSubmit() {
    console.log("Console: ",this.formGroup.value);
    this.user = new Users(this.nom, this.prenom, this.email, this.password, this.phone, this.loginType);
    if (this.password != this.confirmation) {
      this.error = 'mot de passe pas identique';
      this.password = '';
      this.confirmation = '';
      this.toastr.warning("mot de passe pas identique");
    }
    else {
      this.signUpService.signUpClient(this.user).subscribe(res => {
        this.loader = false;
        console.log("res",res);
        if (res) {
          this.toastr.success('Vous êtes inscrit');
          this.signUpService.storeUserDataClient(res.token, res.user);
          this.router.navigate(['/client']);
        }
      }, error => {
        console.log(error);
        this.loader = false;
        this.toastr.warning("Un des format de vos champs est incorrect pour le moment");
      });
    }
  }

  login() {
    this.router.navigate(['/login']);
  }

}
