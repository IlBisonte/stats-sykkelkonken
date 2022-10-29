import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StatsCompetitionTeamService } from '../stats_competitionteam.service';
import { ResultsService } from '../../results/results.service';
import { NavService } from '../../core/nav/nav.service';

@Component({
  selector: 'app-stats-bikerider-sankey',
  templateUrl: './stats-bikerider-sankey.component.html',
  styleUrls: ['./stats-bikerider-sankey.component.css']
})
export class StatsBikeriderSankeyComponent implements OnInit {

  dataSourceSankeyBikeRider: any;
  bikeRiders: any;
  selectedBikeRiderDetailId = -1;
  @Input() selectedCompTeamId = -1;
  @Input() showBikeRiderSelect: boolean = true;
  @Output() loading = new EventEmitter<boolean>();

  constructor(private statsService: StatsCompetitionTeamService, private navService: NavService, private resultsService: ResultsService) { }

  ngOnInit() {
  }
  
  
  getBikeRidersCompetitionTeam(selectedCompTeamId) {
    this.selectedCompTeamId = selectedCompTeamId;
    this.loading.emit(true);
    this.resultsService.getCompetitionTeamBikeRiderResults(selectedCompTeamId).subscribe((result: any) => { // success path
      
      this.loading.emit(false);
      this.bikeRiders = result;
      if (this.bikeRiders) {
        this.selectedBikeRiderDetailId = this.bikeRiders[0].BikeRiderDetailId;
        // this.getBikeRacePointsByBikeRiderDetailId();
      }
    }, error => { // error path;        
    });
  }
  
  getBikeRacePointsByBikeRiderDetailId() {
    
    this.loading.emit(true);
    let year = this.navService.selectedYear;
    this.statsService.getBikeRacePointsByBikeRiderDetailId(year, this.selectedBikeRiderDetailId).subscribe((result: any) => { // success path
      
      this.loading.emit(false);
      if (result.DataItems) {
        this.prepareChartBikeRider(result);
      }
    }, error => { // error path;        
    });
  }

  prepareChartBikeRider(resultDataSource) {
    let chartData = [];
    for (let i = 0; i < resultDataSource.DataItems.length; i++) {
      let dataItem = resultDataSource.DataItems[i];
      chartData.push({
        category: dataItem.Category,
        categoryTarget: dataItem.TargetCategory,
        points: dataItem.Points
      })
    }
    this.dataSourceSankeyBikeRider = chartData;
  }
  
  onBikeRiderIdChanged(e) {
    
    this.getBikeRacePointsByBikeRiderDetailId();
  }

  onBikeRiderNameSelected(bikeRiderName: string) {
    var br = this.bikeRiders.filter(x => x.BikeRiderName == bikeRiderName)[0];
    this.selectedBikeRiderDetailId = br.BikeRiderDetailId;
    this.getBikeRacePointsByBikeRiderDetailId();
  }

  onBikeRiderDetailIdSelected(bikeRiderDetailId: number) {
    this.selectedBikeRiderDetailId = bikeRiderDetailId;
    this.getBikeRacePointsByBikeRiderDetailId();
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

}
