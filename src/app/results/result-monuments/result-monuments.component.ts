import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../results/results.service';
import { NavService } from '../../core/nav/nav.service';


@Component({
  selector: 'app-result-monuments',
  templateUrl: './result-monuments.component.html',
  styleUrls: ['./result-monuments.component.css']
})
export class ResultMonumentsComponent implements OnInit {
  dataSourceMonuments: any;
  dataSourceBikeRiders: any;
  dataSourceBikeRiderResults: any;
  selectedCompetitionTeamName: string;
  selectedBikeRiderName: string;

  constructor(private resultsService: ResultsService, private navService: NavService) { }

  ngOnInit() {
    this.getCompetitionTeams();
  }
  getCompetitionTeams() {
    debugger;
    this.resultsService.getCompetitionTeamResults_monuments(this.navService.selectedYear).subscribe((result: any) => { // success path
      debugger;
      this.dataSourceMonuments = result;
    }, error => { // error path;        
    });
  }
  
  competitionTeamClicked(e, riders: HTMLElement) {
    debugger;
    
    if (window.innerWidth < 800) {
      riders.scrollIntoView();
    }
    this.selectedCompetitionTeamName = e.data.Name;
    this.resultsService.getCompetitionTeamBikeRiderResults_monuments(e.key).subscribe((result: any) => {
      debugger;
      this.dataSourceBikeRiders = result;
    }, error => { // error path;        
    });
  }
  
  bikeRiderClicked(e, results: HTMLElement) {
    debugger;
    if (window.innerWidth < 800) {
      results.scrollIntoView();
    }
    this.selectedBikeRiderName = e.data.BikeRiderName;
    this.resultsService.getBikeRiderResults_monuments(e.key, this.navService.selectedYear).subscribe((result: any) => {
      debugger;
      this.dataSourceBikeRiderResults = result;
    }, error => { // error path;        
    });
  }

  onRowPrepared(e) {
    debugger;
    if (e.rowType === "data") {
      if (e.data.Position === 1) {
        e.rowElement.style.background = "#F8DD52";
        e.rowElement.style.color = "black";
      }
      // else if (e.data.Position > 1 && e.data.Position <= 8) {
      //   e.rowElement.style.background = "#B5D3FF";
      //   e.rowElement.style.color = "black";
      // }
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
                options.totalValue = options.totalValue + options.value.Points;
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
              options.totalValue = options.totalValue + options.value.Points;
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
