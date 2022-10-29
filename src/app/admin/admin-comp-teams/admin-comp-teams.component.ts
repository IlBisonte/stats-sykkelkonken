import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

import { ConfigService } from '../../core/config.service';
import { LoginService } from '../../core/login/login.service';
import { NavService } from '../../core/nav/nav.service';

import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

@Component({
  selector: 'app-admin-comp-teams',
  templateUrl: './admin-comp-teams.component.html',
  styleUrls: ['./admin-comp-teams.component.css', '../../app.component.css']
})
export class AdminCompTeamsComponent implements OnInit {
  dataSource: any[];
  uploadCompetitionTeamsCrossListURL: string;
  uploadCompetitionTeamsRowListURL: string;
  bikeRidersDataSourceStorage: any;
  loadingVisible = false;

  constructor(private adminService: AdminService, private loginService: LoginService, private navService: NavService, private configService: ConfigService) { }

  ngOnInit() {
    
    this.uploadCompetitionTeamsCrossListURL = this.configService.config.serviceUrl + "api/CompetitionTeams/ImportCompetitionTeams?year=" + this.navService.selectedYear;
    this.uploadCompetitionTeamsRowListURL = this.configService.config.serviceUrl + "api/CompetitionTeams/ImportCompetitionTeamsList?year=" + this.navService.selectedYear;
    this.getCompetitionTeams();

  }

  getBikeRiders(key) {
    

    var competitionTeam = this.dataSource.filter(x => x.CompetitionTeamId == key);

    var bikeriders =  competitionTeam["BikeRiders"];
    return bikeriders;
    
}

  import() {
    
    this.adminService.importCompetitionTeams()
      .subscribe((result: any) => { // success path
        
      }, error => { // error path;        
      });
  }

  readFromPCS() {
    
    this.adminService.readFromPCS().subscribe((result: any) => { // success path
      
    }, error => { // error path;        
    });
  }

  removeCompetitionTeams() {
    
    this.adminService.removeCompetitionTeams().subscribe((result: any) => { // success path
      
    }, error => { // error path;        
    });
  }

  getCompetitionTeams() {
    
    this.loadingVisible = true;
    this.adminService.getCompetitionTeams(this.navService.selectedYear).subscribe((result: any) => { // success path
      
      this.loadingVisible = false;
      this.dataSource = result;
    }, error => { // error path; 
           
      this.loadingVisible = false;  
      this.loginService.logout();
      location.reload();
    });
  }
}
