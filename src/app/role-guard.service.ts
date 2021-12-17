// src/app/role-guard.service.ts
import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import { LoginService } from '../app/core/login/login.service';
import decode from 'jwt-decode';
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router, private loginService: LoginService) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
      debugger;
      if (this.loginService.currentUserValue.IsAdmin) {
        return true;
      }
      else {
        return false;
      }
    // this will be passed from the route config
    // on the data property
    // const expectedRole = route.data.expectedRole;
    // const token = localStorage.getItem('token');
    // // decode the token to get its payload
    // const tokenPayload = decode(token);
    // if (
    //   !this.auth.isAuthenticated() || 
    //   tokenPayload.role !== expectedRole
    // ) {
    //   this.router.navigate(['login']);
    //   return false;
    // }
  }
}