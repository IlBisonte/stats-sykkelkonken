import { Component, OnInit } from '@angular/core';
import { StatsCompetitionTeamService } from '../stats_competitionteam.service';
import * as moment from 'moment';

@Component({
  selector: 'app-stats-competitionteam-alltime',
  templateUrl: './stats-competitionteam-alltime.component.html',
  styleUrls: ['./stats-competitionteam-alltime.component.css']
})
export class StatsCompetitionteamAlltimeComponent implements OnInit {

  headerText = "";
  dataSourceCompetitionTeamStats: any;

  constructor(private statsService: StatsCompetitionTeamService) { }

  ngOnInit() {
    let year = moment().year();
    this.headerText = "Maratontabell sykkelkonken 2019-" + year;
    this.getCompetitionTeamScore();
  }

  getCompetitionTeamScore() {
    
    this.statsService.getCompetitionTeamStatsAllTime().subscribe((result: any) => { // success path
      
      this.dataSourceCompetitionTeamStats = result;
    }, error => { // error path;        
    });
  }

}
