import { Component, OnInit, ViewChild } from '@angular/core';
import { StatsCompetitionTeamService } from '../stats_competitionteam.service';
import { ResultsService } from '../../results/results.service';
import { NavService } from '../../core/nav/nav.service';
import { StatsBikeriderSankeyComponent } from '../stats-bikerider-sankey/stats-bikerider-sankey.component';
import { StatsCompetitionteamBikeridersSankeyComponent } from '../stats-competitionteam-bikeriders-sankey/stats-competitionteam-bikeriders-sankey.component';

@Component({
  selector: 'app-stats-competitionteam-sankey',
  templateUrl: './stats-competitionteam-sankey.component.html',
  styleUrls: ['./stats-competitionteam-sankey.component.css']
})
export class StatsCompetitionteamSankeyComponent implements OnInit {
  dataSource: any;
  dataSourceCategories: any;
  dataSourceOneDayRaces: any;
  dataSourceGTs: any;
  dataSourceStageRaces: any;
  competitionTeams: any;
  selectedCompTeamId: number;
  loadingVisible = false;
  selectedBikeRaceCategoryId = -1;
  previousSource = "";
  previousSelectedBikeRaceSource = "";
  previousSelectedBikeRiderSource = "";
  bikeRaceSelected = false;
  bikeRiderSelected = false;
  @ViewChild(StatsCompetitionteamBikeridersSankeyComponent, {static:false}) private statsCompetitionteamBikeridersSankeyComponent: StatsCompetitionteamBikeridersSankeyComponent;
  @ViewChild(StatsBikeriderSankeyComponent, {static:false}) private statsBikeriderSankeyComponent: StatsBikeriderSankeyComponent;
  constructor(private statsService: StatsCompetitionTeamService, private navService: NavService, private resultsService: ResultsService) { }

  ngOnInit() {
    this.getCompetitionTeams();
  }
  
  getCompetitionTeams() {
    this.loadingVisible = true;
    let year = this.navService.selectedYear;
    this.statsService.getCompetitionTeams(year).subscribe((result: any) => { // success path
      this.loadingVisible = false;
      this.competitionTeams = result;
      if (this.competitionTeams) {
        this.selectedCompTeamId = this.competitionTeams[0].CompetitionTeamId;
        this.getCompetitionTeamPointsByBikeRaceCategory();
      }
    }, error => { // error path;        
    });
  }
  

  getCompetitionTeamPointsByBikeRaceCategory() {
    let year = this.navService.selectedYear;
    this.statsService.getCompetitionTeamPointsByBikeRaceCategory(year, this.selectedCompTeamId).subscribe((result: any) => { // success path
      this.loadingVisible = false;
      this.prepareChart(result);
    }, error => { // error path;        
    });
  }

  prepareChart(resultDataSource) {
    let chartData = [];
    for (let i = 0; i < resultDataSource.DataItems.length; i++) {
      let dataItem = resultDataSource.DataItems[i];
      chartData.push({
        category: dataItem.Category,
        categoryTarget: dataItem.TargetCategory,
        points: dataItem.Points
      })
    }
    this.dataSource = chartData;
  }

  getCompetitionTeamPointsByOneDayRaces() {
    let year = this.navService.selectedYear;
    this.statsService.getCompetitionTeamPointsByOneDayRaces(year, this.selectedCompTeamId).subscribe((result: any) => { // success path
      this.loadingVisible = false;
      this.prepareChart(result);
    }, error => { // error path;        
    });
  }

  getCompetitionTeamPointsByOtherOneDayRaces() {
    let year = this.navService.selectedYear;
    this.statsService.getCompetitionTeamPointsByOtherOneDayRaces(year, this.selectedCompTeamId).subscribe((result: any) => { // success path
      this.loadingVisible = false;
      this.prepareChart(result);
    }, error => { // error path;        
    });
  }

  getCompetitionTeamPointsByMonuments() {
    let year = this.navService.selectedYear;
    this.statsService.getCompetitionTeamPointsByMonuments(year, this.selectedCompTeamId).subscribe((result: any) => { // success path
      this.loadingVisible = false;
      this.prepareChart(result);
    }, error => { // error path;        
    });
  }

  getCompetitionTeamPointsByStageRaces() {
    let year = this.navService.selectedYear;
    this.statsService.getCompetitionTeamPointsByStageRaces(year, this.selectedCompTeamId).subscribe((result: any) => { // success path
      this.loadingVisible = false;
      this.prepareChart(result);
    }, error => { // error path;        
    });
  }

  getCompetitionTeamPointsByGTs() {
    let year = this.navService.selectedYear;
    this.statsService.getCompetitionTeamPointsByGTs(year, this.selectedCompTeamId).subscribe((result: any) => { // success path
      this.loadingVisible = false;
      this.prepareChart(result);
    }, error => { // error path;        
    });
  }

  getCompetitionTeamPointsByOtherStageRaces() {
    let year = this.navService.selectedYear;
    this.statsService.getCompetitionTeamPointsByOtherStageRaces(year, this.selectedCompTeamId).subscribe((result: any) => { // success path
      this.loadingVisible = false;
      this.prepareChart(result);
    }, error => { // error path;        
    });
  }

  prepareChartStageRaces(resultDataSource) {
    let chartData = [];
    for (let i = 0; i < resultDataSource.DataItems.length; i++) {
      let dataItem = resultDataSource.DataItems[i];
      chartData.push({
        category: dataItem.Category,
        categoryTarget: dataItem.TargetCategory,
        points: dataItem.Points
      })
    }
    this.dataSourceStageRaces = chartData;
  }
  
  customizeLinkTooltip(info: any) {
      return {
          html: `${info.target}<br/><b>Poeng:</b> ${info.weight}`
      };
  }
  
  customizeNodeTooltip(info: any) {
      return {
          html: `${info.title}<br/><b>Poeng:</b> ${info.weightIn}`
      };
  }
  
  customizeText(info: any) {
    let title = info.title;
    let linksOut = info.linksOut;
    let points = 0;
    if (linksOut.length > 0) {
      linksOut.forEach(link => {
        points += link.weight;
      });
    }
    else if (info.linksIn.length > 0) {
      info.linksIn.forEach(link => {
        points += link.weight;
      });
    }
    return `${info.title}<br/><b>Poeng:</b> ${points}`;
  }

  onCompetitionTeamIdChanged(e) {
    debugger;
    this.getCompetitionTeamPointsByBikeRaceCategory();
    this.statsCompetitionteamBikeridersSankeyComponent.getBikeRacePointsByBikeRiderDetailId(this.selectedCompTeamId);
    this.statsBikeriderSankeyComponent.getBikeRidersCompetitionTeam(this.selectedCompTeamId);
  }

  onLinkClick(e) {
    // if (!this.bikeRiderSelected) { 
      let target = e.target.connection.target;
      if (this.bikeRaceSelected)
      {
        //if bikerace is already selected, then the only option is to select a rider
        this.previousSelectedBikeRaceSource = e.target.connection.source;
        this.getBikeRacePointsByBikeRider(target);
      }
      else if (this.bikeRiderSelected) {
        //if bikerider is already selected, then the only option is to select a race
        this.previousSelectedBikeRaceSource = e.target.connection.source;
        this.getBikeRiderPointsByBikeRace(target);
      }
      else {
        this.previousSource = e.target.connection.source;
        this.selectCategory(target);
      }
    // }
  }

  selectCategory(target) {
    
    switch(target) {
      case "Total":
        this.getCompetitionTeamPointsByBikeRaceCategory();
          break;
      case "Endagsritt":
        this.getCompetitionTeamPointsByOneDayRaces();
          break;
      case "Etapperitt":
        this.getCompetitionTeamPointsByStageRaces();
          break;
      case "Andre endagsritt":
        this.getCompetitionTeamPointsByOtherOneDayRaces();
          break;
      case "Monument":
        this.getCompetitionTeamPointsByMonuments();
          break;
      case "Grand Tour":
        this.getCompetitionTeamPointsByGTs();
          break;
      case "Andre etapperitt":
        this.getCompetitionTeamPointsByOtherStageRaces();
          break;
      default:
        //if no category is selected, then a bike race is selected
        this.getBikeRiderPointsByBikeRace(target);
        break;
    }
  }
  
  getBikeRiderPointsByBikeRace(bikeRaceName: string) {
    debugger;
    let year = this.navService.selectedYear;
    this.statsService.getBikeRiderPointsByBikeRace(year, this.selectedCompTeamId, bikeRaceName).subscribe((result: any) => { // success path
      debugger;
      this.loadingVisible = false;
      this.bikeRaceSelected = true;
      this.bikeRiderSelected = false;
      if (result.DataItems) {
        this.prepareChart(result);
      }
    }, error => { // error path;        
    });
  }
  
  getBikeRacePointsByBikeRider(bikeRiderName: string) {
    debugger;
    let year = this.navService.selectedYear;
    this.statsService.getBikeRacePointsByBikeRider(year, bikeRiderName).subscribe((result: any) => { // success path
      debugger;
      this.loadingVisible = false;
      this.bikeRiderSelected = true;
      this.bikeRaceSelected = false;
      if (result.DataItems) {
        this.prepareChart(result);
      }
    }, error => { // error path;        
    });
  }

  previousCategory() {
    debugger;
    this.bikeRiderSelected = false;
    this.bikeRaceSelected = false;
    this.selectCategory(this.previousSource);
    
    switch(this.previousSource) {
      case "Endagsritt":
        this.previousSource = "Total";
          break;
      case "Etapperitt":
        this.previousSource = "Total";
          break;
      case "Andre endagsritt":
        this.previousSource = "Endagsritt";
          break;
      case "Monument":
        this.previousSource = "Endagsritt";
          break;
      case "Grand Tour":
        this.previousSource = "Etapperitt";
          break;
      case "Andre etapperitt":
        this.previousSource = "Etapperitt";
          break;
    }
  }

  onLinkClickBikeRider(target: string) {
    debugger;
    this.statsBikeriderSankeyComponent.onBikeRiderNameSelected(target);
  }

  onLoading(loading: boolean) {
    this.loadingVisible = loading;
  }

}
