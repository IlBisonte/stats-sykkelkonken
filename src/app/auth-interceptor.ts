import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError, tap, filter, take, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { config } from '../assets/config';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(public authService: AuthService, private router: Router, private injector: Injector, private http: HttpClient) {
        
     }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        debugger;
        // add authorization header with jwt token if available
        let currentUser;
        if (this.authService) {
            currentUser = this.authService.currentUserValue;
        }
        else {
            let userLocalStorage = JSON.parse(localStorage.getItem('currentUser'));
            currentUser = userLocalStorage;
        }
        if (currentUser && currentUser.JwtToken) {
            request = this.addToken(request, currentUser.JwtToken);
        }

        return next.handle(request).pipe(catchError(error => {
            
            if (error instanceof HttpErrorResponse && error.status === 401) {
                return this.handle401Error(request, next);
                // if (this.authService) {
                //     this.authService.logout();
                // }
                // else {
                //     localStorage.removeItem('currentUser');
                // }
                // location.reload();

            } 
            else {
                return throwError(error);
            }
          }));
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
            'Authorization': `Bearer ${token}`
            }
        });
    }

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        debugger;
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.refreshToken().pipe(
            switchMap((token: any) => {
                debugger;
                this.isRefreshing = false;
                this.refreshTokenSubject.next(token.Token);
                return next.handle(this.addToken(request, token.Token));
            }));

        } else {
            return this.refreshTokenSubject.pipe(
            filter(token => token != null),
            take(1),
            switchMap(jwt => {
                return next.handle(this.addToken(request, jwt));
            }));
        }
    }
    
    private refreshToken() {
        debugger;
        let token = this.getToken();
        let refreshToken = this.getRefreshToken();
        let vmRefreshToken = {
            Token: token,
            RefreshToken: refreshToken
        }
        return this.http.post<any>(config.serviceUrl + `/api/Login/Refresh`, vmRefreshToken).pipe(tap((tokens: any) => {
            this.storeJwtToken(tokens.Token, tokens.RefreshToken);
        }));

        // return this.http.post<any>(`${config.serviceUrl}api/Login/Refresh`, {
        //     'token': this.getToken(),
        //     'refreshToken': this.getRefreshToken()
        // }).pipe(tap((tokens: any) => {
        //   this.storeJwtToken(tokens.Token, tokens.RefreshToken);
        // }));
      }

      getToken() {
        var user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            return user.JwtToken;
        }
        else {
            return "";
        }
      }

      getRefreshToken() {
        var user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            return user.RefreshToken;
        }
        else {
            return "";
        }
      }

      storeJwtToken(token: any, refreshToken: any) {
        var user = JSON.parse(localStorage.getItem('currentUser'));
        user.JwtToken = token;
        user.RefreshToken = refreshToken;
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
}