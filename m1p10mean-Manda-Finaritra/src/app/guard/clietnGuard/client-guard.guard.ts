import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Users } from 'src/app/models/users';
import { AuthentificationService } from 'src/app/services/AuthentificationService/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuardGuard implements CanActivate {
  constructor(private authentificationService: AuthentificationService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authentificationService.loggedIn()) {
      const users: Users | undefined = this.authentificationService.getUser();
      if (users) {
        console.log("client")
        console.log(users);
        if (users.loginType === 0) {
          return true
        } else {
          this.authentificationService.clearUserStorage();
        }
      }
      this.router.navigate(['/login']);
      return false;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
