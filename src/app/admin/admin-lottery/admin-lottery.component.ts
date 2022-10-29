import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';

import { DxDataGridComponent } from "devextreme-angular";
import { ConfigService } from '../../core/config.service';
import CustomStore from "devextreme/data/custom_store";
import { LoginService } from '../../core/login/login.service'
import { NavService } from '../../core/nav/nav.service'

@Component({
  selector: 'app-admin-lottery',
  templateUrl: './admin-lottery.component.html',
  styleUrls: ['./admin-lottery.component.css']
})
export class AdminLotteryComponent implements OnInit {
  dataSource: CustomStore;
  dataSourceTeamRiders: CustomStore;
  bikeRidersDataSourceStorage: any;
  bikeRidersDataSource: CustomStore;
  selectedLotteryTeamId: number;
  selectedName: string;
  updateBikeRiders: boolean = true;
  @ViewChild('datagridRiders', {static:false}) dataGridRiders: DxDataGridComponent;

  constructor(private adminService: AdminService, private loginService: LoginService, private navService: NavService) { }

  ngOnInit() {
    
    this.getLotteryTeams();
    this.getBikeRiders();

  }

  logOutUser() {
    this.loginService.logout();
    location.reload();
  }

  getLotteryTeams() {
    
    this.dataSource = new CustomStore({
      load: (loadOptions) => {
        
        return this.adminService.getLotteryTeams(this.navService.selectedYear).toPromise().catch(error =>  
          this.logOutUser()
        );
      },
      insert: (values) => {
        
        let name = values.Name != null ? values.Name : -1;
        let color = values.Color != null ? values.Color : "";
        return this.adminService.insertLotteryTeam(name, color, this.navService.selectedYear).toPromise();
      },
      update: (key, values) => {
        
        let name = values.Name != null ? values.Name : key.Name;
        let color = values.Color != null ? values.Color : key.Color;
        let lotteryTeamId = key.LotteryTeamId;
        return this.adminService.updateLotteryTeam(lotteryTeamId, name, color).toPromise();
      },
      remove: (key) => {
        
        return this.adminService.removeLotteryTeam(key.LotteryTeamId).toPromise();
      }
    });
  }
  
  onSelectionChanged(selectedRow) {
    
    this.selectedLotteryTeamId = selectedRow.selectedRowsData[0].LotteryTeamId;
    this.selectedName = selectedRow.selectedRowsData[0].Name;
    this.dataSourceTeamRiders = new CustomStore({
      key: "BikeRiderId",
      load: (loadOptions) => {
        
          return this.adminService.getRidersToLotteryTeam(this.selectedLotteryTeamId).toPromise();
      },
      insert: (values) => {
        
        return this.adminService.insertRiderLotteryTeam(this.selectedLotteryTeamId, values.BikeRiderId, this.navService.selectedYear).subscribe((result: any) => {
          
          this.getLotteryTeams();
          this.dataGridRiders.instance.refresh();
      });
      },
      update: (key, values) => {
        
        return this.adminService.updateRiderLotteryTeam(this.selectedLotteryTeamId, key, values.BikeRiderId, this.navService.selectedYear).subscribe((result: any) => {
          
          this.getLotteryTeams();
          this.dataGridRiders.instance.refresh();
      });
      },
      remove: (key) => {
        
        return this.adminService.removeRiderLotteryTeam(this.selectedLotteryTeamId, key, this.navService.selectedYear).subscribe((result: any) => {
          this.getLotteryTeams();
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
