import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from '../core/config.service';
import { LoginService } from '../core/login/login.service';

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

export class AdminService {


  constructor(private http: HttpClient, private configService: ConfigService, private loginService: LoginService) {
    }

    importCompetitionTeams(): Observable<any> {
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/competitionteams/ImportCompetitionTeams");
    }

    readFromPCS() {
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/competitionteams/ReadHTML");
    }
    removeCompetitionTeams() {
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/competitionteams/Remove");
    }

    getCompetitionTeams(year: number) {
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/competitionteams/Get?year=" + year);
    }

    uploadBikeRidersUrl() {
      return this.configService.config.serviceUrl + "api/import/ImportBikeRaces";
    }

    getBikeRacesToCalculate(year: number, showCancelled: boolean): Observable<any> {
      
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/bikerace/Get?year=" + year + "&showCancelled=" + showCancelled);
    }

    getBikeRaceSeasonPlacement(year: number): Observable<any> {
      
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/bikerace/GetBikeRaceSeasonPlacement?year=" + year);
    }
    
    updateBikeRaceSeasonPlacement(year: number, selectedBikeRaceDetailIds: any): Observable<any> {
      
      let bikeRaceDetailIds = "";
      selectedBikeRaceDetailIds.forEach(brd => {
        
        bikeRaceDetailIds += "bikeRaceDetailIds=" + brd;
        if (brd != selectedBikeRaceDetailIds[selectedBikeRaceDetailIds.length - 1]) {
          bikeRaceDetailIds += "&";
        }
      });
      return this.http.get<any>(this.configService.config.serviceUrl + `/api/bikerace/UpdateBikeRaceSeasonPlacement?year=${year}&${bikeRaceDetailIds}`);
  }

    addBikeRace(values: any, startDate: any, finishDate: any): Observable<any> {
      
      var bikeRace = {
        Name: values.Name,
        Year: values.Year,
        StartDate: values.StartDateToddMMyyyy,
        FinishDate: values.FinishDateToddMMyyyy,
        CountryName: values.CountryName,
        NoOfStages: values.NoOfStages,
        IsMonument: values.IsMonument,
      }

      return this.http.post<any>(this.configService.config.serviceUrl + `/api/bikerace/Add?startDate=${startDate}&finishDate=${finishDate}`, bikeRace);
    }

    updateBikeRace(bikeRace: any): Observable<any> {
      

      return this.http.put<any>(this.configService.config.serviceUrl + "/api/bikerace/Update", bikeRace);
    }

    deleteBikeRaceDetail(bikeRaceDetailId: any): Observable<any> {
      

      return this.http.delete<any>(this.configService.config.serviceUrl + "/api/bikerace/Delete?bikeRaceDetailId=" + bikeRaceDetailId);
    }
    
    getResultsToBikeRace(bikeRaceDetailId: number): Observable<any> {
      
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/bikerace/GetResultsToCalculate?bikeRaceDetailId=" + bikeRaceDetailId);
    }
    
    getStageResultsToBikeRace(bikeRaceDetailId: number): Observable<any> {
      
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/bikerace/GetStageResults?bikeRaceDetailId=" + bikeRaceDetailId);
    }

    updateStageResultToBikeRace(bikeRaceDetailId: number, stageNo: number, stagePosition: number, bikeRiderId: number) : Observable<any> {
      
      let stageResult = {
        BikeRaceDetailId: bikeRaceDetailId,
        StageNo: stageNo,
        StagePosition: stagePosition,
        BikeRiderId: bikeRiderId
      }
      return this.http.put<any>(this.configService.config.serviceUrl + "/api/bikerace/UpdateStageResult", stageResult);

    }


    getBikeRiderById(id: any): Observable<any> {
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/bikerider/get?id=" + id);
    }

    updateBikeRaceResult(bikeRaceDetailId: any, bikeRiderId: any, position: any): Observable<any> {
      
      let brr = {
        BikeRaceDetailId: bikeRaceDetailId,
        BikeRiderId: bikeRiderId,
        Position: position,
      }
      return this.http.put<any>(this.configService.config.serviceUrl + '/api/bikerace/UpdateBikeRaceResultBikeRider', brr);
    }

    getBikeRidersByIds(ids: any[]): Observable<any> {
      
      var sIds = JSON.stringify(ids);
      let requestOptions = {
        params: new HttpParams()
          .append('bikeRiderIds', ids.join(', ')),
      }
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/bikerider/getByIds", requestOptions);
    }

    getBikeRidersBySearchText(searchText): Observable<any> {
      return this.http.get<any>(this.configService.config.serviceUrl + '/api/bikerider/getbysearchtext?searchtext=' + searchText);
    }

    getBikeRidersBySearchTextByYear(searchText, year: number): Observable<any> {
      return this.http.get<any>(this.configService.config.serviceUrl + '/api/bikerider/GetBySearchTextAndYear?searchtext=' + searchText + '&year=' + year);
    }

    getLeaderJerseyResultsToBikeRace(bikeRaceDetailId: number): Observable<any> {
      
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/bikerace/GetLeaderJerseyResultsToCalculate?bikeRaceDetailId=" + bikeRaceDetailId);
    }

    updateLeaderJerseyResult(bikeRaceDetailId: any, bikeRiderId: any, leaderJerseyId: any, position: any): Observable<any> {
      
      let leaderJerseyResult = {
        BikeRaceDetailId: bikeRaceDetailId,
        BikeRiderId: bikeRiderId,
        LeaderJerseyId: leaderJerseyId,
        LeaderJerseyPosition: position,
      }
      return this.http.put<any>(this.configService.config.serviceUrl + '/api/bikerace/UpdateLeaderJerseyResult', leaderJerseyResult);
    }

    /* Champions League */
    
    getChampionsLeagueTeams(year: number) {
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/competitionteams/GetChampionsLeagueTeams?year=" + year);
    }

    getRidersToChampionsLeagueTeams(championsLeagueTeamId: number) {
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/competitionteams/GetRidersChampionsLeagueTeam?championsLeagueTeamId=" + championsLeagueTeamId);
    }
    
    insertChampionsLeagueTeam(teamName: any, color: any, year: number): Observable<any> {
      
      let clTeam = {
        ChampionsLeagueTeamId: -1,
        TeamName: teamName,
        Color: color,
        Year: year
      }
      return this.http.post<any>(this.configService.config.serviceUrl + '/api/competitionteams/InsertChampionsLeagueTeam', clTeam);
    }
    
    updateChampionsLeagueTeam(championsLeagueTeamId: any, teamName: any, color:any): Observable<any> {
      
      let clTeam = {
        ChampionsLeagueTeamId: championsLeagueTeamId,
        TeamName: teamName,
        Color: color,
      }
      return this.http.put<any>(this.configService.config.serviceUrl + '/api/competitionteams/UpdateChampionsLeagueTeam', clTeam);
    }

    removeChampionsLeagueTeam(teamId: number) {
      return this.http.delete<any>(this.configService.config.serviceUrl + "/api/competitionteams/RemoveChampionsLeagueTeam?championsLeagueTeamId=" + teamId);
    }

    removeChampionsLeagueTeams() {
      return this.http.delete<any>(this.configService.config.serviceUrl + "/api/competitionteams/RemoveChampionsLeagueTeams");
    }
    
    
    insertRiderChampionsLeagueTeam(championsLeagueTeamId: any, bikeRiderId: any, year: number): Observable<any> {
      
      let clTeamRider = {
        ChampionsLeagueTeamId: championsLeagueTeamId,
        BikeRiderId: bikeRiderId,
        Year: year,
      }
      return this.http.post<any>(this.configService.config.serviceUrl + '/api/competitionteams/InsertBikeRiderChampionsLeagueTeam', clTeamRider);
    }
    
    updateRiderChampionsLeagueTeam(championsLeagueTeamId: any, origBikeRiderId: any, newBikeRiderId: any, year: number): Observable<any> {
      
      let clTeamRider = {
        ChampionsLeagueTeamId: championsLeagueTeamId,
        OrigBikeRiderId: origBikeRiderId,
        NewBikeRiderId: newBikeRiderId,
        Year: year,
      }
      return this.http.put<any>(this.configService.config.serviceUrl + '/api/competitionteams/UpdateBikeRiderChampionsLeagueTeam', clTeamRider);
    }

    removeRiderChampionsLeagueTeam(championsLeagueTeamId: number, bikeRiderId: any, year: number) {
      let clTeamRider = {
        ChampionsLeagueTeamId: championsLeagueTeamId,
        BikeRiderId: bikeRiderId,
        Year: year,
      }
      return this.http.put<any>(this.configService.config.serviceUrl + "/api/competitionteams/RemoveBikeRiderChampionsLeagueTeam", clTeamRider);
    }


    /*Lottery */
    
    getLotteryTeams(year: number) {
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/competitionteams/GetLotteryTeams?year=" + year);
    }

    getRidersToLotteryTeam(lotteryTeamId: number) {
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/competitionteams/GetRidersLotteryTeam?lotteryTeamId=" + lotteryTeamId);
    }
    
    insertLotteryTeam(teamName: any, color: any, year: number): Observable<any> {
      
      let lotteryTeam = {
        LotteryTeamId: -1,
        Name: teamName,
        Color: color,
        Year: year
      }
      return this.http.post<any>(this.configService.config.serviceUrl + '/api/competitionteams/InsertLotteryTeam', lotteryTeam);
    }
    
    updateLotteryTeam(lotteryTeamId: any, teamName: any, color:any): Observable<any> {
      
      let lotteryTeam = {
        LotteryTeamId: lotteryTeamId,
        Name: teamName,
        Color: color,
      }
      return this.http.put<any>(this.configService.config.serviceUrl + '/api/competitionteams/UpdateLotteryTeam', lotteryTeam);
    }

    removeLotteryTeam(teamId: number) {
      return this.http.delete<any>(this.configService.config.serviceUrl + "/api/competitionteams/RemoveLotteryTeam?lotteryTeamId=" + teamId);
    }

    insertRiderLotteryTeam(lotteryTeamId: any, bikeRiderId: any, year: number): Observable<any> {
      
      let lotteryTeamRider = {
        LotteryTeamId: lotteryTeamId,
        BikeRiderId: bikeRiderId,
        Year: year,
      }
      return this.http.post<any>(this.configService.config.serviceUrl + '/api/competitionteams/InsertBikeRiderLotteryTeam', lotteryTeamRider);
    }
    
    updateRiderLotteryTeam(lotteryTeamId: any, origBikeRiderId: any, newBikeRiderId: any, year: number): Observable<any> {
      
      let lotteryTeamRider = {
        LotteryTeamId: lotteryTeamId,
        OrigBikeRiderId: origBikeRiderId,
        NewBikeRiderId: newBikeRiderId,
        Year: year,
      }
      return this.http.put<any>(this.configService.config.serviceUrl + '/api/competitionteams/UpdateBikeRiderLotteryTeam', lotteryTeamRider);
    }

    removeRiderLotteryTeam(lotteryTeamId: number, bikeRiderId: any, year: number) {
      let lotteryTeamRider = {
        LotteryTeamId: lotteryTeamId,
        BikeRiderId: bikeRiderId,
        Year: year,
      }
      return this.http.put<any>(this.configService.config.serviceUrl + "/api/competitionteams/RemoveBikeRiderLotteryTeam", lotteryTeamRider);
    }

    /* Youth */
    
    getYouthTeams(year: number) {
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/competitionteams/GetYouthTeams?year=" + year);
    }

    getRidersToYouthTeam(youthTeamId: number) {
      return this.http.get<any>(this.configService.config.serviceUrl + "/api/competitionteams/GetRidersYouthTeam?youthTeamId=" + youthTeamId);
    }
    
    insertYouthTeam(teamName: any, color: any, year: number): Observable<any> {
      
      let youthTeam = {
        YouthTeamId: -1,
        Name: teamName,
        Color: color,
        Year: year
      }
      return this.http.post<any>(this.configService.config.serviceUrl + '/api/competitionteams/InsertYouthTeam', youthTeam);
    }
    
    updateYouthTeam(youthTeamId: any, teamName: any, color:any): Observable<any> {
      
      let youthTeam = {
        YouthTeamId: youthTeamId,
        Name: teamName,
        Color: color,
      }
      return this.http.put<any>(this.configService.config.serviceUrl + '/api/competitionteams/UpdateYouthTeam', youthTeam);
    }

    removeYouthTeam(teamId: number) {
      return this.http.delete<any>(this.configService.config.serviceUrl + "/api/competitionteams/RemoveYouthTeam?youthTeamId=" + teamId);
    }

    insertRiderYouthTeam(youthTeamId: any, bikeRiderId: any, year: number): Observable<any> {
      
      let youthTeamRider = {
        YouthTeamId: youthTeamId,
        BikeRiderId: bikeRiderId,
        Year: year,
      }
      return this.http.post<any>(this.configService.config.serviceUrl + '/api/competitionteams/InsertBikeRiderYouthTeam', youthTeamRider);
    }
    
    updateRiderYouthTeam(youthTeamId: any, origBikeRiderId: any, newBikeRiderId: any, year: number): Observable<any> {
      
      let youthTeamRider = {
        YouthTeamId: youthTeamId,
        OrigBikeRiderId: origBikeRiderId,
        NewBikeRiderId: newBikeRiderId,
        Year: year,
      }
      return this.http.put<any>(this.configService.config.serviceUrl + '/api/competitionteams/UpdateBikeRiderYouthTeam', youthTeamRider);
    }

    removeRiderYouthTeam(youthTeamId: number, bikeRiderId: any, year: number) {
      let youthTeamRider = {
        YouthTeamId: youthTeamId,
        BikeRiderId: bikeRiderId,
        Year: year,
      }
      return this.http.put<any>(this.configService.config.serviceUrl + "/api/competitionteams/RemoveBikeRiderYouthTeam", youthTeamRider);
    }

    getBikeRidersBySearchTextByYearYouth(searchText, year: number): Observable<any> {
      return this.http.get<any>(this.configService.config.serviceUrl + '/api/bikerider/getbysearchtextYouth?searchtext=' + searchText + '&year=' + year);
    }
}
