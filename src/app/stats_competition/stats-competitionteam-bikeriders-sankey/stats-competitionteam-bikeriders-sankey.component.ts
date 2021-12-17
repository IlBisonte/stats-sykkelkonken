import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { StatsCompetitionTeamService } from '../stats_competitionteam.service';
import { NavService } from '../../core/nav/nav.service';
import { StatsBikeriderSankeyComponent } from '../stats-bikerider-sankey/stats-bikerider-sankey.component';

@Component({
  selector: 'app-stats-competitionteam-bikeriders-sankey',
  templateUrl: './stats-competitionteam-bikeriders-sankey.component.html',
  styleUrls: ['./stats-competitionteam-bikeriders-sankey.component.css']
})
export class StatsCompetitionteamBikeridersSankeyComponent implements OnInit {

  dataSource: any;
  bikeRiders: any;
  selectedCompTeamId = -1;
  heightSankey = 500;
  @Output() loading = new EventEmitter<boolean>();
  @Output() linkClicked = new EventEmitter<any>();
  @ViewChild(StatsBikeriderSankeyComponent, {static:false}) private statsBikeriderSankeyComponent: StatsBikeriderSankeyComponent;

  constructor(private statsService: StatsCompetitionTeamService, private navService: NavService) { }

  ngOnInit() {
  }
  
  
  getBikeRacePointsByBikeRiderDetailId(selectedCompTeamId) {
    debugger;

    this.loading.emit(true);
    this.selectedCompTeamId = selectedCompTeamId;
    let year = this.navService.selectedYear;
    this.statsService.getBikeRiderPointsByCompetitionTeam(year, selectedCompTeamId).subscribe((result: any) => { // success path
      debugger;
      this.loading.emit(false);
      if (result.DataItems) {
        this.heightSankey = result.DataItems.length * 65;
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
    this.dataSource = chartData;
  }

  onLinkClick(e) {
    debugger;
    let target = e.target.connection.target;
    this.linkClicked.emit(target);
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
