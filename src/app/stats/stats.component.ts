import { Component, OnInit, ViewChild } from '@angular/core';
import { StatsService } from '../stats/stats.service';
import { StatsBikeriderresultsComponent } from '../stats/stats-bikeriderresults/stats-bikeriderresults/stats-bikeriderresults.component';
import { NavService } from '../core/nav/nav.service';
import { StatsBikeriderSankeyComponent } from '../stats_competition/stats-bikerider-sankey/stats-bikerider-sankey.component';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  dataSourceRiderStats: any;
  dataSourceBikeRiderResults: any;
  selectedBikeRiderDetailId: number;
  selectedBikeRiderName: string;
  selectedTabIndexBikeRider = 0;
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
  @ViewChild(StatsBikeriderresultsComponent, {static:false}) private bikeRiderResultComponent: StatsBikeriderresultsComponent;
  @ViewChild(StatsBikeriderSankeyComponent, {static:false}) private statsBikeriderSankeyComponent: StatsBikeriderSankeyComponent;

  constructor(private statsService: StatsService, private navService: NavService) { }

  ngOnInit() {
    this.getBikeRiderStats();
  }

  getBikeRiderStats() {
    debugger;
    this.statsService.getBikeRiderStats(this.navService.selectedYear).subscribe((result: any) => { // success path
      debugger;
      this.dataSourceRiderStats = result;
    }, error => { // error path;        
    });
  }

  bikeRiderClicked(e, results: HTMLElement) {
    debugger;
    if (window.innerWidth < 800) {
      results.scrollIntoView();
    }
    this.selectedBikeRiderDetailId = e.key;
    this.selectedBikeRiderName = e.data.BikeRiderName;
    this.bikeRiderResultComponent.showResultsToBikeRider(this.selectedBikeRiderDetailId);
    this.statsBikeriderSankeyComponent.onBikeRiderDetailIdSelected(this.selectedBikeRiderDetailId);
    // this.statsService.getBikeRiderResults(e.key).subscribe((result: any) => {
    //   debugger;
    //   this.dataSourceBikeRiderResults = result;
    // }, error => { // error path;        
    // });
  }

  customSortingFunctionSelectedBy (rowData) {
    debugger;
    return rowData.NoOfSelections;
  }
  
  customSortingFunctionRiderIndex (rowData) {
    debugger;
    return rowData.RiderIndex;
  }
  
  customSortingFunctionBikeRace (rowData) {
    debugger;
    return rowData.StartDate;
  }

  onCellPrepared(e){
    if(e.rowType === "data" && e.column.dataField === "CLTeamName") {
      debugger;
      e.cellElement.style.backgroundColor = e.data.Color;
      e.cellElement.innerText = "";
      e.cellElement.title = e.data.CLTeamName != null ? e.data.CLTeamName : "Ikke valgt i CL";
    }
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

}
