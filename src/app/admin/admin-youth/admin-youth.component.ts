import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';

import { DxDataGridComponent } from "devextreme-angular";
import { ConfigService } from '../../core/config.service';
import CustomStore from "devextreme/data/custom_store";
import { LoginService } from '../../core/login/login.service'
import { NavService } from '../../core/nav/nav.service'

@Component({
  selector: 'app-admin-youth',
  templateUrl: './admin-youth.component.html',
  styleUrls: ['./admin-youth.component.css']
})
export class AdminYouthComponent implements OnInit {
  dataSource: CustomStore;
  dataSourceTeamRiders: CustomStore;
  bikeRidersDataSourceStorage: any;
  bikeRidersDataSource: CustomStore;
  selectedYouthTeamId: number;
  selectedName: string;
  updateBikeRiders: boolean = true;
  @ViewChild('datagridRiders', {static:false}) dataGridRiders: DxDataGridComponent;

  constructor(private adminService: AdminService, private loginService: LoginService, private navService: NavService) { }

  ngOnInit() {
    
    this.getYouthTeams();
    this.getBikeRiders();

  }

  logOutUser() {
    this.loginService.logout();
    location.reload();
  }

  getYouthTeams() {
    
    this.dataSource = new CustomStore({
      load: (loadOptions) => {
        
        return this.adminService.getYouthTeams(this.navService.selectedYear).toPromise().catch(error =>  
          this.logOutUser()
        );
      },
      insert: (values) => {
        
        let name = values.Name != null ? values.Name : -1;
        let color = values.Color != null ? values.Color : "";
        return this.adminService.insertYouthTeam(name, color, this.navService.selectedYear).toPromise();
      },
      update: (key, values) => {
        
        let name = values.Name != null ? values.Name : key.Name;
        let color = values.Color != null ? values.Color : key.Color;
        let youthTeamId = key.YouthTeamId;
        return this.adminService.updateYouthTeam(youthTeamId, name, color).toPromise();
      },
      remove: (key) => {
        
        return this.adminService.removeYouthTeam(key.YouthTeamId).toPromise();
      }
    });
  }
  
  onSelectionChanged(selectedRow) {
    
    this.selectedYouthTeamId = selectedRow.selectedRowsData[0].YouthTeamId;
    this.selectedName = selectedRow.selectedRowsData[0].Name;
    this.dataSourceTeamRiders = new CustomStore({
      key: "BikeRiderId",
      load: (loadOptions) => {
        
          return this.adminService.getRidersToYouthTeam(this.selectedYouthTeamId).toPromise();
      },
      insert: (values) => {
        
        return this.adminService.insertRiderYouthTeam(this.selectedYouthTeamId, values.BikeRiderId, this.navService.selectedYear).subscribe((result: any) => {
          
          this.getYouthTeams();
          this.dataGridRiders.instance.refresh();
      });
      },
      update: (key, values) => {
        
        return this.adminService.updateRiderYouthTeam(this.selectedYouthTeamId, key, values.BikeRiderId, this.navService.selectedYear).subscribe((result: any) => {
          
          this.getYouthTeams();
          this.dataGridRiders.instance.refresh();
      });
      },
      remove: (key) => {
        
        return this.adminService.removeRiderYouthTeam(this.selectedYouthTeamId, key, this.navService.selectedYear).subscribe((result: any) => {
          this.getYouthTeams();
          this.dataGridRiders.instance.refresh();
        });
      }
    });
  }

  getBikeRiders() {
    
    // project
    this.bikeRidersDataSource = new CustomStore({
      key: "BikeRiderId",
      load: (loadOptions) => {
        if (loadOptions.searchValue != null) {
          if (loadOptions.searchValue.length > 2) {
          return this.adminService.getBikeRidersBySearchTextByYearYouth(loadOptions.searchValue.toString(), this.navService.selectedYear).toPromise();
          }
          else {
            return [{BikeRiderId: -1, BikeRiderName: " "}];
          }

        }
        else {
          return this.adminService.getBikeRidersBySearchTextByYearYouth("", this.navService.selectedYear).toPromise();
          //return "";
        }
      },
      byKey: (key) => {
        return this.adminService.getBikeRiderById(key).toPromise();
      },
    });
  }
  
  onGridEditorValueChanged(ea, e) {
    
    
    e.setValue(ea.value);
    if (ea.value === null) {
      return;
    }
  }

  onColorValueChanged(ea, e) {
    
    e.setValue(ea.value);
    if (ea.value === null) {
      return;
    }
  }

}
