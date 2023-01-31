import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/AuthentificationService/authentification.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loader = false;
  email: string = "mandaaroniaina2001@gmail.com";
  password: string = "123456";
  isAdmin = false;

  constructor(private router: Router, private authentificationService: AuthentificationService, private readonly fb: FormBuilder, private toastr: ToastrService) {

  }


  load = true;
  formGroup !: FormGroup;

  ngOnInit(): void {
    this.load = true;
    this.formGroup = this.fb.group({
      email: [this.email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [this.password, Validators.required]
    });
  }

  get c(): any {
    return this.formGroup.controls;
  }

  changeIsAdminAtelier() {
    this.isAdmin = true;
    this.email = "atelier1@gmail.com";
    this.password = "atelier1";
  }

  changeIsAdminFinancier() {
    this.isAdmin = true;
    this.email = "financier1@gmail.com";
    this.password = "financier1";
  }

  changeClient() {
    this.isAdmin = false;
    this.email = "mandaaroniaina2001@gmail.com";
    this.password = "123456";
  }

  login(): void {
    if (this.formGroup.valid) {
      this.loader = true;
      this.authentificationService.login(this.email, this.password).subscribe(res => {
        this.loader = false;
        if (res) {
          console.log(res.user);
          this.authentificationService.storeUserData(res.token, res.user);
          if (res.user.loginType == 1) {
            this.router.navigate(['/atelier']);
          }
          else if (res.user.loginType == 2) {
            this.router.navigate(['/financier']);
          }
          else if (res.user.loginType == 0) {
            this.router.navigate(['/clientuser']);
          }
        }
      }, error => {
        this.loader = false;
        this.toastr.error(error.error.msg);
      });
    } else {
      this.toastr.warning("Un des format de vos champs est incorrect");
    }
  }

  signUpClient() {
    this.router.navigate(['/login/signUp']);
  }
}
