import { Component, OnInit, ViewChild } from '@angular/core';
import { ResultsService } from '../results/results.service';
import { StatsCompetitionteamBikeridersSankeyComponent } from '../stats_competition/stats-competitionteam-bikeriders-sankey/stats-competitionteam-bikeriders-sankey.component';
import { StatsBikeriderSankeyComponent } from '../stats_competition/stats-bikerider-sankey/stats-bikerider-sankey.component';
import { StatsBikeriderresultsComponent } from './../stats/stats-bikeriderresults/stats-bikeriderresults/stats-bikeriderresults.component';
import { NavService } from '../core/nav/nav.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  dataSourceCompetitionTeams: any;
  dataSourceBikeRiders: any;
  dataSourceBikeRiderResults: any;
  selectedCompetitionTeamId: number;
  selectedCompetitionTeamName: string;
  selectedBikeRiderName: string;
  tabs: any[] = [
      {     
          id: 0,
          text: "Liste", 
      },
      { 
          id: 1,
          text: "Grafisk",  
      }
  ];
  selectedTabIndexCompTeamRiders = 0;
  selectedTabIndexBikeRider = 0;
  loadingVisible = false;

  @ViewChild(StatsCompetitionteamBikeridersSankeyComponent, {static:false}) private statsCompetitionteamBikeridersSankeyComponent: StatsCompetitionteamBikeridersSankeyComponent;
  @ViewChild(StatsBikeriderresultsComponent, {static:false}) private bikeRiderResultComponent: StatsBikeriderresultsComponent;
  @ViewChild(StatsBikeriderSankeyComponent, {static:false}) private statsBikeriderSankeyComponent: StatsBikeriderSankeyComponent;

  constructor(private resultsService: ResultsService, private navService: NavService) { }

  ngOnInit() {
    this.getCompetitionTeams();
  }
  getCompetitionTeams() {
    debugger;
    this.loadingVisible = true;
    this.resultsService.getCompetitionTeamResults(this.navService.selectedYear).subscribe((result: any) => { // success path
      debugger;
      this.loadingVisible = false;
      this.dataSourceCompetitionTeams = result;
    }, error => { // error path;        
    });
  }
  
  competitionTeamClicked(e, riders: HTMLElement) {
    debugger;
    if (window.innerWidth < 800) {
    riders.scrollIntoView();
    }
    this.selectedCompetitionTeamId = e.key;
    this.selectedCompetitionTeamName = e.data.Name;
    this.resultsService.getCompetitionTeamBikeRiderResults(e.key).subscribe((result: any) => {
      debugger;
      this.dataSourceBikeRiders = result;
      this.statsCompetitionteamBikeridersSankeyComponent.getBikeRacePointsByBikeRiderDetailId(this.selectedCompetitionTeamId);
    }, error => { // error path;        
    });
  }
  
  bikeRiderClicked(e, apiTabs: HTMLElement) {
    debugger;
    if (window.innerWidth < 800) {
    apiTabs.scrollIntoView();
    }
    this.selectedBikeRiderName = e.data.BikeRiderName;
    this.bikeRiderResultComponent.showResultsToBikeRider(e.key);
    this.statsBikeriderSankeyComponent.onBikeRiderDetailIdSelected(e.key);
  }

  onRowPrepared(e) {
    debugger;
    if (e.rowType === "data") {
      if (e.data.Position === 1) {
        e.rowElement.style.background = "#F8DD52";
        e.rowElement.style.color = "black";
      }
      else if (e.data.Position > 1 && e.data.Position <= 8) {
        e.rowElement.style.background = "#B5D3FF";
        e.rowElement.style.color = "black";
      }
    }
  }

  sortBikeRaceName(e) {
    debugger;
    return "";
  }
  customSortingFunction (rowData) {
    debugger;
    return rowData.StartDate;
  }

  calculateSummary(options) {
    debugger;
    // Calculating "customSummary1"
    if(options.name == "customSumTotalPoints") {
        switch(options.summaryProcess) {
            case "start":
                // Initializing "totalValue" here
                options.totalValue = 0;
                break;
            case "calculate":
                if (options.value.GCPoints > 0)
                {
                  options.totalValue = options.totalValue + options.value.GCPoints;
                }
                if (options.value.StagePoints > 0)
                {
                  options.totalValue = options.totalValue + options.value.StagePoints;
                }
                if (options.value.LeaderJerseyPoints > 0)
                {
                  options.totalValue = options.totalValue + options.value.LeaderJerseyPoints;
                }
                // Modifying "totalValue" here
                break;
            case "finalize":
                // Assigning the final value to "totalValue" here
                options.totalValue = options.totalValue;
                break;
        }
    }
    else if(options.name == "customSumTotalPointsGroup") {
      switch(options.summaryProcess) {
          case "start":
              // Initializing "totalValue" here
              options.totalValue = 0;
              break;
          case "calculate":
              if (options.value.GCPoints > 0)
              {
                options.totalValue = options.totalValue + options.value.GCPoints;
              }
              if (options.value.StagePoints > 0)
              {
                options.totalValue = options.totalValue + options.value.StagePoints;
              }
              if (options.value.LeaderJerseyPoints > 0)
              {
                options.totalValue = options.totalValue + options.value.LeaderJerseyPoints;
              }
              // Modifying "totalValue" here
              break;
          case "finalize":
              // Assigning the final value to "totalValue" here
              options.totalValue = options.totalValue;
              break;
      }
    }
  }

  selectTab(e) {
    if (this.selectedTabIndexCompTeamRiders === 1) {
      this.statsCompetitionteamBikeridersSankeyComponent.getBikeRacePointsByBikeRiderDetailId(this.selectedCompetitionTeamId);
    }
  }

  onLinkClickBikeRider(bikeRiderName: string) {
    this.selectedBikeRiderName = bikeRiderName;
    var br = this.dataSourceBikeRiders.filter(x => x.BikeRiderName == bikeRiderName)[0];
    this.bikeRiderResultComponent.showResultsToBikeRider(br.BikeRiderDetailId);
    this.statsBikeriderSankeyComponent.onBikeRiderDetailIdSelected(br.BikeRiderDetailId);
  }

  onLoadingDetail(loading: boolean) {

  }

}
