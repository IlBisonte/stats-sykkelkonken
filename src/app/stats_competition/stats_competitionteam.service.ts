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

export class StatsCompetitionTeamService {


  constructor(private http: HttpClient, private configService: ConfigService) {
    }

    getCompetitionTeamStatsAllTime(): Observable<any> {
      
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/StatsCompetitionteam/GetCompetitionTeamStatsAllTime");
    }

    getCLTeamStatsAllTime(): Observable<any> {
      
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/StatsCompetitionteam/GetChampionsLeagueTeamStatsAllTime");
    }

    getCompetitionTeamResultPerBikeRace(year: number): Observable<any> {
      
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/StatsCompetitionteam/GetCompetitionTeamResultPerBikeRace?year=" + year);
    }

    getCompetitionTeams(year: number) {
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/StatsCompetitionteam/Get?year=" + year);
    }

    getNoOfVictoriesCompTeams(year: number) {
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/StatsCompetitionteam/GetNoOfVictoriesCompTeams?year=" + year);
    }

    getCompetitionTeamPointsByBikeRaceCategory(year: number, competitionTeamId: number) {
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/StatsCompetitionteam/GetCompetitionTeamPointsByBikeRaceCategory?year=" + year + "&competitionTeamId=" + competitionTeamId);
    }

    getCompetitionTeamPointsByOneDayRaces(year: number, competitionTeamId: number) {
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/StatsCompetitionteam/GetCompetitionTeamPointsByOneDayRaces?year=" + year + "&competitionTeamId=" + competitionTeamId);
    }

    getCompetitionTeamPointsByOtherOneDayRaces(year: number, competitionTeamId: number) {
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/StatsCompetitionteam/GetCompetitionTeamPointsByOtherOneDayRaces?year=" + year + "&competitionTeamId=" + competitionTeamId);
    }

    getCompetitionTeamPointsByMonuments(year: number, competitionTeamId: number) {
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/StatsCompetitionteam/GetCompetitionTeamPointsByMonuments?year=" + year + "&competitionTeamId=" + competitionTeamId);
    }

    getCompetitionTeamPointsByGTs(year: number, competitionTeamId: number) {
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/StatsCompetitionteam/GetCompetitionTeamPointsByGTs?year=" + year + "&competitionTeamId=" + competitionTeamId);
    }

    getCompetitionTeamPointsByOtherStageRaces(year: number, competitionTeamId: number) {
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/StatsCompetitionteam/GetCompetitionTeamPointsByOtherStageRaces?year=" + year + "&competitionTeamId=" + competitionTeamId);
    }

    getCompetitionTeamPointsByStageRaces(year: number, competitionTeamId: number) {
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/StatsCompetitionteam/GetCompetitionTeamPointsByStageRaces?year=" + year + "&competitionTeamId=" + competitionTeamId);
    }

    getBikeRiderPointsByBikeRace(year: number, competitionTeamId: number, bikeRaceName: string) {
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/StatsCompetitionteam/GetBikeRiderPointsByBikeRace?year=" + year + "&competitionTeamId=" + competitionTeamId + "&bikeRaceName=" + bikeRaceName);
    }

    getBikeRacePointsByBikeRider(year: number, bikeRiderName: string) {
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/StatsCompetitionteam/GetBikeRacePointsByBikeRider?year=" + year + "&bikeRiderName=" + bikeRiderName);
    }

    getBikeRacePointsByBikeRiderDetailId(year: number, bikeRiderDetailId: number) {
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/StatsCompetitionteam/GetBikeRacePointsByBikeRiderDetailId?year=" + year + "&bikeRiderDetailId=" + bikeRiderDetailId);
    }

    getBikeRiderPointsByCompetitionTeam(year: number, competitionTeamId: number) {
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/StatsCompetitionteam/GetBikeRiderPointsByCompetitionTeam?year=" + year + "&competitionTeamId=" + competitionTeamId);
    }

}
