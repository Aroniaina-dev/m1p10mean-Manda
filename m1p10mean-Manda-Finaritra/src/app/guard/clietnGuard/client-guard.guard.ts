import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Users } from 'src/app/models/users';
import { AuthentificationService } from 'src/app/services/AuthentificationService/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuardGuard implements CanActivate {
  idTemp = 0;
  constructor(private authentificationService: AuthentificationService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authentificationService.loggedIn()) {
      const users: User | undefined = this.authentificationService.getUser();
      if (users) {
        this.idTemp = users.loginType;
        console.log("User temps client guard: ", this.idTemp);
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
