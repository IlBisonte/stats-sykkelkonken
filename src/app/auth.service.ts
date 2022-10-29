// src/app//auth.service.ts
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './core/login/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(public jwtHelper: JwtHelperService) {
    
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  
  public isAuthenticated(): boolean {
      
      if (this.currentUserValue) {
        const token = this.currentUserValue.JwtToken;
        // Check whether the token is expired and return
        // true or false
        return !this.jwtHelper.isTokenExpired(token);
        // return true;
      }
      else {
        return false;
      }
  }

  public get currentUserValue(): User {
    if (this.currentUserSubject.value) {
      return this.currentUserSubject.value;
    }
    else {
      let user = new User();
      user.IsLoggedIn = false;
      user.IsAdmin = false;
      user.JwtToken = null;
      return user;
    }
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
  

private loginData(result: any) {
  
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  localStorage.setItem('currentUser', JSON.stringify(result));
  this.currentUserSubject.next(result);

  // return user;
}
}