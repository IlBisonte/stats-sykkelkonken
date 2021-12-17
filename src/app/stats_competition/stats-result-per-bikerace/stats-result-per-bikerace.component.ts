import { Component, OnInit } from '@angular/core';
import { StatsCompetitionTeamService } from '../stats_competitionteam.service';
import { NavService } from '../../core/nav/nav.service';
import * as moment from 'moment';

@Component({
  selector: 'app-stats-result-per-bikerace',
  templateUrl: './stats-result-per-bikerace.component.html',
  styleUrls: ['./stats-result-per-bikerace.component.css']
})
export class StatsResultPerBikeraceComponent implements OnInit {
  dataSource: any;
  competitionTeams: any;
  selectedCompTeams: any[];
  minPosition = 1;
  maxPosition = 80;
  minPoints = 0;
  maxPoints = 1178;
  noOfCompTeam = 0;
  maxRank = 0;
  resultDataSource: any;
  loadingVisible = false;
  showRank = true;
  seriesBikeRaceName = [];
  constructor(private statsService: StatsCompetitionTeamService, private navService: NavService) { }

  ngOnInit() {
    this.getCompetitionTeams();
    
  }
  
  getCompetitionTeams() {
    debugger;
    this.loadingVisible = true;
    let year = this.navService.selectedYear;
    this.statsService.getCompetitionTeams(year).subscribe((result: any) => { // success path
      debugger;
      this.competitionTeams = result;
      this.noOfCompTeam = this.competitionTeams.length;
      this.maxRank = this.competitionTeams.length;
      this.maxPosition = this.noOfCompTeam;
      this.getCompetitionTeamResultPerBikeRace();
    }, error => { // error path;        
    });
  }

  getCompetitionTeamResultPerBikeRace() {
    debugger;
    let year = this.navService.selectedYear;
    this.statsService.getCompetitionTeamResultPerBikeRace(year).subscribe((result: any) => { // success path
      debugger;
      this.loadingVisible = false;
      this.resultDataSource = result;
      this.minPoints = result.MinPoints;
      this.maxPoints = result.MaxPoints;
      this.setSelectedCompTeamsInit(result);
      this.prepareChart(result);
    }, error => { // error path;        
    });
  }

  setSelectedCompTeamsInit(resultsPerBikeRace) {
    this.selectedCompTeams = [];
    var lastResult = resultsPerBikeRace[resultsPerBikeRace.length - 1];
    for (let i = 1; i <= 10; i++) {
      let compTeamResult = lastResult.CompetitionTeams.filter( vendor => vendor['Ranking'] === i);
      this.selectedCompTeams.push(compTeamResult[0].Name);
      // this.selectedCompTeams.push({
      //   CompetitionTeamId: compTeamResult[0].CompetitionTeamId,
      //   Name: compTeamResult[0].Name,
      // });
    }
  }

  prepareChart(resultsPerBikeRace) {
    let chartData: any = [];
    this.seriesBikeRaceName = [];
    for (var i = 0; i < resultsPerBikeRace.length; i++) {
      let bikeRaceData = {};
      let bikeRace = resultsPerBikeRace[i];
      bikeRaceData["bikeRaceName"] = bikeRace["BikeRaceName"];
      if (bikeRaceData["bikeRaceName"]) {
        this.seriesBikeRaceName.push(bikeRaceData["bikeRaceName"]);
      }
      for (let t = 0; t < this.selectedCompTeams.length; t++) {
        let selCompTeam = this.selectedCompTeams[t];
        // let compTeamResult = bikeRace.CompetitionTeams.filter( vendor => vendor['CompetitionTeamId'] === selCompTeam.CompetitionTeamId);
        let compTeamResult = bikeRace.CompetitionTeams.filter( ct => ct['Name'] === selCompTeam);
        if (this.showRank) {
          bikeRaceData[selCompTeam] = compTeamResult[0].Ranking;
        }
        else {
          bikeRaceData[selCompTeam] = compTeamResult[0].Points;
        }
      }

      chartData.push(bikeRaceData);
    }
    this.dataSource = chartData;
  }

  customizeLabel = (arg: any) => {
    debugger;
        return {
            visible: true,
            backgroundColor: "#ff7c7c",
            customizeText: function (e: any) {
                return e.valueText + "&#176F";
            }
        };
  }
  
  customizeTooltip = (arg: any) => {
    debugger;
    let node = "";
    let bikeRaceShortName = arg.argument;
    let competitionTeamName = arg.seriesName;
    let bikeRace = this.resultDataSource.filter(x => x.BikeRaceName === bikeRaceShortName);
    if (bikeRace[0]) {
      let compTeamResult = bikeRace[0].CompetitionTeams.filter( ct => ct['Name'] === competitionTeamName);
      if (compTeamResult[0]) {
        //find previous result and show progress
        let progressRanking = 0;
        let progressPoints = 0;
        let indexBikeRace = this.seriesBikeRaceName.indexOf(bikeRaceShortName);
        if (indexBikeRace > 0) {
          let prevBikeRaceName = this.seriesBikeRaceName[indexBikeRace-1];
          if (prevBikeRaceName) {
            let prevBikeRace = this.resultDataSource.filter(x => x.BikeRaceName === prevBikeRaceName);
            if (prevBikeRace[0]) {
              let prevCompTeamResult = prevBikeRace[0].CompetitionTeams.filter( ct => ct['Name'] === competitionTeamName);
              if (prevCompTeamResult[0]) {
                // if (compTeamResult[0].Ranking < prevCompTeamResult[0].Ranking) {
                  progressRanking = prevCompTeamResult[0].Ranking - compTeamResult[0].Ranking;
                // }
                // else if (compTeamResult[0].Ranking > prevCompTeamResult[0].Ranking) {
                //   progressRanking = compTeamResult[0].Ranking - prevCompTeamResult[0].Ranking;
                // }
                progressPoints = compTeamResult[0].Points - prevCompTeamResult[0].Points;
              }
            }
          }
          let progressRankingLabel = "";
          if (progressRanking > 0) {
            let pluss = "+";
            if (progressRanking > 25) {
              pluss = "++";
            }
            progressRankingLabel = "<span style='color: green; font-size: 10px'>" + pluss + progressRanking + "</span>";
          }
          else if (progressRanking < 0) {
            let minus = "";
            if (progressRanking < -25) {
              minus = "-";
            }
            progressRankingLabel = "<span style='color: red; font-size: 10px'>" + minus + progressRanking + "</span>";
          }
          let progressPointsLabel = "<span style='color: green; font-size: 10px'>+" + progressPoints + "</span>";
          node = "<h3>" + competitionTeamName + "</h3>" + 
                 "<br>Plassering: " + compTeamResult[0].Ranking + " " + progressRankingLabel +
                 "<br>Poeng: " + compTeamResult[0].Points + " " + progressPointsLabel;
        }
        else {
          node = "<h3>" + competitionTeamName + "</h3><br>Plassering: " + compTeamResult[0].Ranking + ' <br> Poeng: ' + compTeamResult[0].Points;
        }
      }
    }
    return {
        html: node
    };
  }

  onSelectedCompTeamChanged(e) {
    debugger;
    this.prepareChart(this.resultDataSource);
  }

  onValueChangedRankPoints(e) {
    if (this.showRank) {
      this.minPosition = 1;
      this.maxPosition = this.noOfCompTeam;
      this.maxRank = this.noOfCompTeam;
    }
    else {
      this.minPosition = this.minPoints;
      this.maxPosition = this.maxPoints;
      this.maxRank = this.maxPoints;
    }
    this.prepareChart(this.resultDataSource);
  }
}
