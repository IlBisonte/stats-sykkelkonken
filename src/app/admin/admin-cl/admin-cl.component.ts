import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';

import { DxDataGridComponent } from "devextreme-angular";
import CustomStore from "devextreme/data/custom_store";
import { LoginService } from '../../core/login/login.service'
import { NavService } from '../../core/nav/nav.service'

@Component({
  selector: 'app-admin-cl',
  templateUrl: './admin-cl.component.html',
  styleUrls: ['./admin-cl.component.css']
})
export class AdminClComponent implements OnInit {
  dataSource: CustomStore;
  dataSourceTeamRiders: CustomStore;
  bikeRidersDataSourceStorage: any;
  bikeRidersDataSource: CustomStore;
  selectedChampionsLeagueTeamId: number;
  selectedTeamName: string;
  @ViewChild('datagridRiders', {static:false}) dataGridRiders: DxDataGridComponent;

  constructor(private adminService: AdminService, private loginService: LoginService, private navService: NavService) { }

  ngOnInit() {
    debugger;
    this.getChampionsLeagueTeams();
    this.getBikeRiders();

  }

  logOutUser() {
    this.loginService.logout();
    location.reload();
  }

  getChampionsLeagueTeams() {
    debugger;
    this.dataSource = new CustomStore({
      load: (loadOptions) => {
        debugger;
        return this.adminService.getChampionsLeagueTeams(this.navService.selectedYear).toPromise().catch(error =>  
          this.logOutUser()
        );
      },
      insert: (values) => {
        debugger;
        let teamName = values.TeamName != null ? values.TeamName : -1;
        let color = values.Color != null ? values.Color : "";
        return this.adminService.insertChampionsLeagueTeam(teamName, color, this.navService.selectedYear).toPromise();
      },
      update: (key, values) => {
        debugger;
        let teamName = values.TeamName != null ? values.TeamName : key.TeamName;
        let color = values.Color != null ? values.Color : key.Color;
        let championsLeagueTeamId = key.ChampionsLeagueTeamId;
        return this.adminService.updateChampionsLeagueTeam(championsLeagueTeamId, teamName, color).toPromise();
      },
      remove: (key) => {
        debugger;
        return this.adminService.removeChampionsLeagueTeam(key.ChampionsLeagueTeamId).toPromise();
      }
    });
  }

  removeChampionsLeagueTeams() {
    debugger;
    this.adminService.removeCompetitionTeams().subscribe((result: any) => { // success path
      debugger;
    }, error => { // error path;        
    });
  }
  
  onSelectionChanged(selectedRow) {
    debugger;
    this.selectedChampionsLeagueTeamId = selectedRow.selectedRowsData[0].ChampionsLeagueTeamId;
    this.selectedTeamName = selectedRow.selectedRowsData[0].TeamName;
    this.dataSourceTeamRiders = new CustomStore({
      key: "BikeRiderId",
      load: (loadOptions) => {
        debugger;
        return this.adminService.getRidersToChampionsLeagueTeams(this.selectedChampionsLeagueTeamId).toPromise();
      },
      insert: (values) => {
        debugger;
        return this.adminService.insertRiderChampionsLeagueTeam(this.selectedChampionsLeagueTeamId, values.BikeRiderId, this.navService.selectedYear).subscribe((result: any) => {
          this.getChampionsLeagueTeams();
          this.dataGridRiders.instance.refresh();
      });
      },
      update: (key, values) => {
        debugger;
        return this.adminService.updateRiderChampionsLeagueTeam(this.selectedChampionsLeagueTeamId, key, values.BikeRiderId, this.navService.selectedYear).subscribe((result: any) => {
          this.getChampionsLeagueTeams();
          this.dataGridRiders.instance.refresh();
      });
      },
      remove: (key) => {
        debugger;
        return this.adminService.removeRiderChampionsLeagueTeam(this.selectedChampionsLeagueTeamId, key, this.navService.selectedYear).subscribe((result: any) => {
            this.getChampionsLeagueTeams();
            this.dataGridRiders.instance.refresh();
        });
      }
    });
  }

//   getRidersToTeam(key) {
//     debugger;
//     this.adminService.getRidersToChampionsLeagueTeams(key).subscribe((result: any) => { // success path
//       debugger;
//       return result;
//     }, error => { // error path;        
//     });
// }

  getBikeRiders() {
    debugger;
    // project
    this.bikeRidersDataSource = new CustomStore({
      key: "BikeRiderId",
      load: (loadOptions) => {
        if (loadOptions.searchValue != null) {
          if (loadOptions.searchValue.length > 2) {
          return this.adminService.getBikeRidersBySearchTextByYear(loadOptions.searchValue.toString(), this.navService.selectedYear).toPromise();
          }
          else {
            return [{BikeRiderId: -1, BikeRiderName: " "}];
          }

        }
        else {
          return this.adminService.getBikeRidersBySearchTextByYear("", this.navService.selectedYear).toPromise();
          //return "";
        }
      },
      byKey: (key) => {
        return this.adminService.getBikeRiderById(key).toPromise();
      },
    });
  }
  
  onGridEditorValueChanged(ea, e) {
    debugger;
    
    e.setValue(ea.value);
    if (ea.value === null) {
      return;
    }
  }

  onColorValueChanged(ea, e) {
    debugger;
    e.setValue(ea.value);
    if (ea.value === null) {
      return;
    }
  }

}
