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

export class ResultsService {


  constructor(private http: HttpClient, private configService: ConfigService) {
    }

    getCompetitionTeamResults(year: number): Observable<any> {
      debugger;
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/Result/GetCompetitionTeamResults?year=" + year);
    }

    getCompetitionTeamBikeRiderResults(competitionTeamId: number): Observable<any> {
        debugger;
        return this.http.get<any>(this.configService.config.serviceUrl + "/api/Result/GetCompetitionTeamBikeRiderResults?competitionTeamId=" + competitionTeamId);
    }

    getBikeRiderResults(bikeRiderId: number): Observable<any> {
        debugger;
        return this.http.get<any>(this.configService.config.serviceUrl + "/api/Result/GetBikeRiderResults?bikeRiderId=" + bikeRiderId);
    }

    getBikeRaces(year: number): Observable<any> {
      debugger;
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/Result/GetBikeRaces?year=" + year);
    }

    getBikeRaceCompetitionTeamResults(bikeRaceId: number, year: number): Observable<any> {
        debugger;
        return this.http.get<any>(this.configService.config.serviceUrl + "/api/Result/GetBikeRaceCompetitionTeamResults?bikeRaceId=" + bikeRaceId + "&year=" + year);
    }

    getBikeRaceStageCompetitionTeamResults(bikeRaceId: number): Observable<any> {
        debugger;
        return this.http.get<any>(this.configService.config.serviceUrl + "/api/Result/GetBikeRaceStageCompetitionTeamResults?bikeRaceId=" + bikeRaceId);
    }

    getCompetitionTeamResults_monuments(year: number): Observable<any> {
      debugger;
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/Result/GetCompetitionTeamResults_Monuments?year=" + year);
    }

    getCompetitionTeamBikeRiderResults_monuments(competitionTeamId: number): Observable<any> {
        debugger;
        return this.http.get<any>(this.configService.config.serviceUrl + "/api/Result/GetCompetitionTeamBikeRiderResults_Monuments?competitionTeamId=" + competitionTeamId);
    }

    getBikeRiderResults_monuments(bikeRiderDetailId: number, year: number): Observable<any> {
        debugger;
        return this.http.get<any>(this.configService.config.serviceUrl + "/api/Result/GetBikeRiderResults_Monuments?bikeRiderDetailId=" + bikeRiderDetailId + "&year=" + year);
    }

    getBikeRaceCLTeamResults(bikeRaceId: number, year: number): Observable<any> {
        debugger;
        return this.http.get<any>(this.configService.config.serviceUrl + "/api/Result/GetBikeRaceCLTeamResults?bikeRaceId=" + bikeRaceId + "&year=" + year);
    }

    getCLTeamResults(year: number): Observable<any> {
      debugger;
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/Result/GetCLTeamResults?year=" + year);
    }

    getCLTeamBikeRiderResults(clTeamId: number): Observable<any> {
        debugger;
        return this.http.get<any>(this.configService.config.serviceUrl + "/api/Result/GetCLTeamBikeRiderResults?clTeamId=" + clTeamId);
    }

    getLotteryTeamResults(year: number): Observable<any> {
      debugger;
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/Result/GetLotteryTeamResults?year=" + year);
    }

    getLotteryTeamBikeRiderResults(lotteryTeamId: number): Observable<any> {
        debugger;
        return this.http.get<any>(this.configService.config.serviceUrl + "/api/Result/GetLotteryTeamBikeRiderResults?lotteryTeamId=" + lotteryTeamId);
    }

    /* Youth */
    getYouthTeamResults(year: number): Observable<any> {
      debugger;
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/Result/GetYouthTeamResults?year=" + year);
    }

    getYouthTeamBikeRiderResults(youthTeamId: number): Observable<any> {
        debugger;
        return this.http.get<any>(this.configService.config.serviceUrl + "/api/Result/GetYouthTeamBikeRiderResults?youthTeamId=" + youthTeamId);
    }

}
