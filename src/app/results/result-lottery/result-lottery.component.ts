import { Component, OnInit, ViewChild } from '@angular/core';
import { ResultsService } from '../../results/results.service';
import { StatsBikeriderresultsComponent } from './../../stats/stats-bikeriderresults/stats-bikeriderresults/stats-bikeriderresults.component';
import { NavService } from '../../core/nav/nav.service';

@Component({
  selector: 'app-result-lottery',
  templateUrl: './result-lottery.component.html',
  styleUrls: ['./result-lottery.component.css']
})
export class ResultLotteryComponent implements OnInit {
  dataSourceLotteryTeams: any;
  dataSourceBikeRiders: any;
  dataSourceBikeRiderResults: any;
  selectedLotteryTeamName: string;
  selectedBikeRiderName: string;
  @ViewChild(StatsBikeriderresultsComponent, {static:false}) private bikeRiderResultComponent: StatsBikeriderresultsComponent;

  constructor(private resultsService: ResultsService, private navService: NavService) { }

  ngOnInit() {
    this.getCompetitionTeams();
  }
  getCompetitionTeams() {
    
    this.resultsService.getLotteryTeamResults(this.navService.selectedYear).subscribe((result: any) => { // success path
      
      this.dataSourceLotteryTeams = result;
    }, error => {
    });
  }
  
  lotteryTeamClicked(e, riders: HTMLElement) {
    
    
    if (window.innerWidth < 800) {
      riders.scrollIntoView();
    }
    this.selectedLotteryTeamName = e.data.Name;
    this.resultsService.getLotteryTeamBikeRiderResults(e.key).subscribe((result: any) => {
      
      this.dataSourceBikeRiders = result;
    }, error => {
    });
  }
  
  bikeRiderClicked(e, results: HTMLElement) {
    
    if (window.innerWidth < 800) {
      results.scrollIntoView();
    }
    this.selectedBikeRiderName = e.data.BikeRiderName;
    this.bikeRiderResultComponent.showResultsToBikeRider(e.key);
  }

  onRowPrepared(e) {
    
    if (e.rowType === "data") {
      if (e.data.Position === 1) {
        e.rowElement.style.background = "#F8DD52";
        e.rowElement.style.color = "black";
      }
    }
  }

  onCellPrepared(e){
    if(e.rowType === "data" && e.column.dataField === "Color") {
      
      e.cellElement.style.backgroundColor = e.data.Color;
      e.cellElement.innerText = "";
    }
  }

  sortBikeRaceName(e) {
    
    return "";
  }
  customSortingFunction (rowData) {
    
    return rowData.StartDate;
  }

  calculateSummary(options) {
    
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
}
