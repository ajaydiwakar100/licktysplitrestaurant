import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('outletAccessToken')) {
            // logged in so return true
            return true;
        } else {
          this.router.navigate([''], {
            queryParams: {
              return: state.url
          }
        });

        return false;
      }
    }
}
