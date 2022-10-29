import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../results/results.service';
import { NavService } from '../../core/nav/nav.service';

@Component({
  selector: 'app-result-bikerace-cl',
  templateUrl: './result-bikerace-cl.component.html',
  styleUrls: ['./result-bikerace-cl.component.css']
})
export class ResultBikeraceClComponent implements OnInit {

  bikeRaceDataSource: any;
  totalResultsDataSource: any;
  gcResultsDataSource: any;
  selectedBikeRaceId: number;
  stageResultsDataSource: any;
  leaderJerseyDataSource: any;
  resultFileName: string;
  stageFileName: string;
  leaderJerseyFileName: string;
  selectedBikeRaceIsStageRace: boolean = false;
  selectedTabIndex: number = 0;
  selectedBikeRaceName: string; 
  selectedBikeRaceCategoryId: number = 0;
  loadingVisible = false;
  tabs: any[] = [
    {     
        id: 0,
        text: "Total", 
    },
    { 
        id: 1,
        text: "Sammenlagt",  
    },
    { 
        id: 2,
        text: "Etapper",  
    }
];

  constructor(private resultsService: ResultsService, private navService: NavService) { }

  ngOnInit() {
    this.getBikeRaces();
    this.resultFileName = "Resultat Per Sykkelritt";
    this.stageFileName = "Etapperesultater";
  }
  

  getBikeRaces() {
    
    this.loadingVisible = true;
    this.resultsService.getBikeRaces(this.navService.selectedYear).subscribe((result: any) => {
      
      this.loadingVisible = false;
      this.bikeRaceDataSource = result;
    }, error => { // error path;        
    });
  }

  onSelectionChanged(selectedRow, results: HTMLElement) {
    
    if (window.innerWidth < 800) {
      results.scrollIntoView();
    }
    this.loadingVisible = true;
    this.selectedBikeRaceId = selectedRow.selectedRowsData[0].BikeRaceId;
    this.resultFileName = "Resultat " + selectedRow.selectedRowsData[0].Name;
    this.stageFileName = "Etapperesultater " + selectedRow.selectedRowsData[0].Name;
    this.leaderJerseyFileName = "Trøyer " + selectedRow.selectedRowsData[0].Name;
    this.selectedBikeRaceIsStageRace = selectedRow.selectedRowsData[0].NoOfStages > 0;
    this.selectedBikeRaceCategoryId = selectedRow.selectedRowsData[0].BikeRaceCategoryId;
    this.createTabs();
    this.selectedTabIndex = this.selectedBikeRaceIsStageRace ? 0 : 1;
    this.selectedBikeRaceName = selectedRow.selectedRowsData[0].Name;
    
    this.resultsService.getBikeRaceCLTeamResults(this.selectedBikeRaceId, this.navService.selectedYear).subscribe((result: any) => {
      
      this.loadingVisible = false;
      this.totalResultsDataSource = result.TotalResults;
      this.gcResultsDataSource = result.GCResults;
      this.stageResultsDataSource = result.StageResults;
      this.leaderJerseyDataSource = result.LeaderJerseyResults;
    }, error => {
    });
  }

  createTabs() {
    if (this.selectedBikeRaceIsStageRace) {
      if (this.selectedBikeRaceCategoryId == 4 || this.selectedBikeRaceCategoryId == 5) {
          this.tabs = [
            {     
                id: 0,
                text: "Total", 
            },
            { 
                id: 1,
                text: "Sammenlagt",  
            },
            { 
                id: 2,
                text: "Etapper",  
            },
            { 
                id: 3,
                text: "Trøyer",  
            }
        ];
      }
      else {
        this.tabs = [
          {     
            id: 0,
            text: "Total", 
          },
          {     
              id: 1,
              text: "Sammenlagt", 
          },
          { 
              id: 2,
              text: "Etapper",  
          }
        ];
      }
    }
    else {
      this.tabs = [
        {     
            id: 1,
            text: "Total", 
        }
    ];
    }
  }

  selectTab(e) {
    
    this.selectedTabIndex = e.itemData.id;
  }
  

  onRowPrepared(e) {
    
    if (e.rowType === "data") {
      if (e.data.Position === 1 && this.selectedBikeRaceName.indexOf("Italia") > 0) {
        e.rowElement.style.background = "#E7527F";
        e.rowElement.style.color = "black";
      }
      else if (e.data.Position === 1 && this.selectedBikeRaceName.indexOf("La Vuelta") > 0) {
        e.rowElement.style.background = "#DA291C";
        e.rowElement.style.color = "black";
      }
      else if (e.data.Position === 1) {
        e.rowElement.style.background = "#F8DD52";
        e.rowElement.style.color = "black";
      }  
    }
  }
}
