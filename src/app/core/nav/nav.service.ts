import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class NavService {
  private _selectedYear: number = 2021;

    constructor(private http: HttpClient) {
    }

    public get selectedYear(): number {
      let selYear = +localStorage.getItem('selectedYear');
      if (selYear == 0) {
        selYear = new Date().getFullYear();
      }
      return selYear;
    }

    public setSelectedYear(selectedYear) {
      this._selectedYear = selectedYear;
      localStorage.setItem('selectedYear', JSON.stringify(this._selectedYear));
      location.reload();
    }

}
