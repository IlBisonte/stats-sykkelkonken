// src/app/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { LoginService } from '../app/core/login/login.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router, private loginService: LoginService) {}
  canActivate(): boolean {
    
    if (this.loginService.currentUserValue.IsAdmin) {
      return true;
    }
    else {
      return false;
    }
    // if (!this.auth.isAuthenticated()) {
    //   this.router.navigate(['login']);
    //   return false;
    // }
    // return true;
  }
}