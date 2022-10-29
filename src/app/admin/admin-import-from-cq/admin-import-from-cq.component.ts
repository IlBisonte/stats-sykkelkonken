import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { NavService } from '../../core/nav/nav.service';

import { ConfigService } from '../../core/config.service';

@Component({
  selector: 'app-admin-import-from-cq',
  templateUrl: './admin-import-from-cq.component.html',
  styleUrls: ['./admin-import-from-cq.component.css', '../../app.component.css']
})
export class AdminImportFromCqComponent implements OnInit {

  uploadRidersURL: string;
  uploadTeamsURL: string;
  uploadRacesURL: string;
  value: any[] = [];

  constructor(private adminService: AdminService, private navService: NavService, private configService: ConfigService) { 
  }

  ngOnInit() {
    
    
    this.uploadRidersURL = this.configService.config.serviceUrl + "api/import/ImportBikeRiders?year=" + this.navService.selectedYear;
    this.uploadTeamsURL = this.configService.config.serviceUrl + "api/import/ImportBikeTeams";
    this.uploadRacesURL = this.configService.config.serviceUrl + "api/import/ImportBikeRaces?year=" + this.navService.selectedYear;
  }



}
