import { Component, OnInit } from '@angular/core';
import { StatsService } from '../stats.service';
import * as moment from 'moment';

@Component({
  selector: 'app-stats-bikeriderscoretotal',
  templateUrl: './stats-bikeriderscoretotal.component.html',
  styleUrls: ['./stats-bikeriderscoretotal.component.css']
})
export class StatsBikeriderscoretotalComponent implements OnInit {

  headerText = "Totalscore ryttere";
  dataSourceBikeRider: any;

  constructor(private statsService: StatsService) { }

  ngOnInit() {
    let year = moment().year();
    this.headerText = "Totalscore ryttere 2019-" + year;
    this.getBikeRiderTotalScore();
  }

  getBikeRiderTotalScore() {
    debugger;
    this.statsService.getBikeRiderTotalScore().subscribe((result: any) => { // success path
      debugger;
      this.dataSourceBikeRider = result;
    }, error => { // error path;        
    });
  }

}
