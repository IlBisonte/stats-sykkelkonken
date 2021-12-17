import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user';

import { ConfigService } from '../../core/config.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

    constructor(private http: HttpClient, private configService: ConfigService) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
    }

    login(username: string, password: string): Observable<any> {
      return this.http.get<any>(this.configService.config.serviceUrl + `/api/Login/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`)
      .pipe(
        tap(data => this.loginData(data))
      );
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

    signup(username: string, password: string): Observable<any> {
      debugger;
      var user = {
          UserName: username,
          Password: password
      }
      return this.http.post<any>(this.configService.config.serviceUrl + '/api/Login/SignUp', user);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
    

  private loginData(result: any) {
    debugger;
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', JSON.stringify(result));
    this.currentUserSubject.next(result);

    // return user;
  }

}
