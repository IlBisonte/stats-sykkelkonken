import { Component, OnInit } from '@angular/core';
import { StatsCompetitionTeamService } from '../stats_competitionteam.service';
import * as moment from 'moment';

@Component({
  selector: 'app-stats-championsleague-alltime',
  templateUrl: './stats-championsleague-alltime.component.html',
  styleUrls: ['./stats-championsleague-alltime.component.css']
})
export class StatsChampionsleagueAlltimeComponent implements OnInit {

  headerText = "";
  dataSource: any;

  constructor(private statsService: StatsCompetitionTeamService) { }

  ngOnInit() {
    let year = moment().year();
    this.headerText = "Maratontabell CL 2019-" + year;
    this.getCompetitionTeamScore();
  }

  getCompetitionTeamScore() {
    debugger;
    this.statsService.getCLTeamStatsAllTime().subscribe((result: any) => { // success path
      debugger;
      this.dataSource = result;
    }, error => { // error path;        
    });
  }

}
