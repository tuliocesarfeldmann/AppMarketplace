import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const roles = this.authService.getRoles();
    if (typeof route.data["roles"] != 'undefined') {
      if (!route.data["roles"].find(x => { return roles.indexOf(x) >= 0})) {
        this.router.navigate(["/login"]);
        return false;
      }
    }
    return this.canLoad();
  }

  canLoad() {
    if (!this.authService.isLogged) {
      this.router.navigate(["/login"]);
    }
    return this.authService.isLogged;
  }
}