import { Component, OnInit, Input } from '@angular/core';
import { StatsService } from '../../stats.service';
import { NavService } from '../../../core/nav/nav.service';

@Component({
  selector: 'app-stats-bikeriderresults',
  templateUrl: './stats-bikeriderresults.component.html',
  styleUrls: ['./stats-bikeriderresults.component.css']
})
export class StatsBikeriderresultsComponent implements OnInit {

  dataSourceBikeRiderResults: any;
  @Input() selectedBikeRiderName: string;
  fileName: any = "Resultat Rytter";
  listPickedByCompTeams = [];
  constructor(private statsService: StatsService, private navService: NavService) { }

  ngOnInit() {
  }


  showResultsToBikeRider(selectedBikeRiderDetailId) {
    
    this.fileName = "Poeng " + this.selectedBikeRiderName;
    this.getCompTeamsWithSelectedBikeRider(selectedBikeRiderDetailId);
    this.statsService.getBikeRiderResults(selectedBikeRiderDetailId, this.navService.selectedYear).subscribe((result: any) => {
      
      this.dataSourceBikeRiderResults = result;
    }, error => { // error path;        
    });
  }
  

  getCompTeamsWithSelectedBikeRider(selectedBikeRiderDetailId) {
    this.statsService.getCompTeamsWithSelectedBikeRider(selectedBikeRiderDetailId).subscribe((result: any) => {
      
      this.listPickedByCompTeams = [];
      result.forEach(compTeamName => {
        this.listPickedByCompTeams.push(compTeamName);
      });
    }, error => { // error path;        
    });
  }
  
  
  customSortingFunctionBikeRace (rowData) {
    
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
  
  onCellPrepared(e) {
    if(e.rowType === "data" && e.column.dataField === "BikeRaceName") {
      
    }
  }

}
