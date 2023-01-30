import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthentificationService } from 'src/app/services/AuthentificationService/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivatNoConnectionGuard implements CanActivate {
  constructor(private authentificationService: AuthentificationService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authentificationService.loggedIn()) {
      return true;
    } else {
      const user = this.authentificationService.getUser();
      console.log("User temps: ", user);
      if(user?.loginType == 0){
        this.router.navigate(['/clientuser']);
      }
      else if(user?.loginType == 1){
        this.router.navigate(['/atelier']);
      }
      else if(user?.loginType == 2){
        this.router.navigate(['/financier']);
      }
      
      return false;
    }
  }

}
