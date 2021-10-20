import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.user === null) {
      this.router.navigateByUrl('/error/401');
      return false;
    }

    if (this.authService.isTokenExpired()) {
      this.router.navigateByUrl('/login');
      return false;
    }

    const expectedRole = route.data.roles;
    if (!!expectedRole.includes(this.authService.user.value?.userType)) {
      return true;
    }

    this.router.navigateByUrl('/error/403');
    return false;
  }
}
