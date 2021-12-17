import { Component, OnInit } from '@angular/core';
import { StatsCompetitionTeamService } from '../stats_competitionteam.service';
import * as moment from 'moment';
import { NavService } from '../../core/nav/nav.service';

@Component({
  selector: 'app-stats-bikerace-victories',
  templateUrl: './stats-bikerace-victories.component.html',
  styleUrls: ['./stats-bikerace-victories.component.css']
})
export class StatsBikeraceVictoriesComponent implements OnInit {

  dataSource: any;
  loadingVisible = false;

  constructor(private statsService: StatsCompetitionTeamService, private navService: NavService) { }

  ngOnInit() {
    this.getCompetitionTeamScore();
  }

  getCompetitionTeamScore() {
    debugger;
    this.loadingVisible = true;
    let year = this.navService.selectedYear;
    this.statsService.getNoOfVictoriesCompTeams(year).subscribe((result: any) => { // success path
      debugger;
      this.loadingVisible = false;
      this.dataSource = result;
    }, error => { // error path;        
    });
  }

}
