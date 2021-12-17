import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from '../core/config.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

// export class CompetitionTeam {
//   BikeRiders: any[];
//   CompetitionTeamId: number;
//   SumCQ: number;
//   TeamName: string;

// }

export class StatsService {


    constructor(private http: HttpClient, private configService: ConfigService) {}

    getBikeRiderStats(year: number): Observable<any> {
      debugger;
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/Stats/GetBikeRiderStats?year=" + year);
    }
    
    getBikeRiderResults(bikeRiderDetailId: number, year: number): Observable<any> {
        debugger;
        return this.http.get<any>(this.configService.config.serviceUrl + "/api/Result/GetBikeRiderResults?bikeRiderDetailId=" + bikeRiderDetailId + "&year=" + year);
    }

    getBikeRiderTotalScore(): Observable<any> {
      debugger;
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/Stats/GetBikeRiderScoreAllTime");
    }

    getCompTeamsWithSelectedBikeRider(bikeRiderDetailId: number): Observable<any> {
      debugger;
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/Stats/GetCompTeamsWithSelectedBikeRider?bikeRiderDetailId=" + bikeRiderDetailId);
    }


}
