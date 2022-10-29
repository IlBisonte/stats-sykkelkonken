import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


export interface Config {
    serviceUrl: string;
}

export interface Version {
    versionNo: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: Config;
  configUrl = 'assets/config.json';
  version: Version;
  versionUrl = 'assets/version.json';

  constructor(private http: HttpClient) {    
    
    // this.getConfig()
    //   // clone the data object, using its known Config shape
    //   .subscribe((data: Config) => this.config = { ...data });
    // this.getVersion()
    //   // clone the data object, using its known Version shape
    //   .subscribe((data: Version) => this.version = { ...data });
  }

  //load config file from app.module. part of APP_INITIALIZE
  load() :Promise<any>  {

    const promise = this.http.get(this.configUrl)
      .toPromise()
      .then((data: Config) => {
        
        this.config = { ...data }
        // Object.assign(this, data);
        return data;

      });

    return promise;
}

  getConfig() {
    return this.http.get<Config>(this.configUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getVersion() {
    return this.http.get<Version>(this.versionUrl)
      .pipe(
      catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  
}
