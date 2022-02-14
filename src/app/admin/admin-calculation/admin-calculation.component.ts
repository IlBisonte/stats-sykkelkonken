import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from '../admin.service';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import CustomStore from "devextreme/data/custom_store";
import * as moment from 'moment';
import { LoginService } from '../../core/login/login.service'
import { NavService } from '../../core/nav/nav.service'

@Component({
  selector: 'app-admin-calculation',
  templateUrl: './admin-calculation.component.html',
  styleUrls: ['./admin-calculation.component.css']
})
export class AdminCalculationComponent implements OnInit {

  bikeRaceDataSource: any;
  bikeRaceResultsDataSource: any;
  selectedBikeRaceDetailId: number;
  bikeRidersDataSource: CustomStore;
  leaderJerseyDataSource: CustomStore;
  bikeRiderIdsDataSource: any[];
  stageResultsDataSource: any;
  selectedBikeRaceName: string;
  selectedTabIndex: number = 0;
  selectedBikeRaceIsStageRace: boolean = false;
  selectedBikeRaceCategoryId: number = 0;
  // keyExprLeaderJersey: any[] = ['LeaderJerseyId', 'LeaderJerseyPosition'];
  tabs: any[] = [
    {     
        id: 0,
        text: "Sammenlagt", 
    },
    { 
        id: 1,
        text: "Etapper",  
    },
  ];
  @Input() isAdmin: boolean = true;

  constructor(private adminService: AdminService, private loginService: LoginService, private navService: NavService) { }

  ngOnInit() {
    this.getBikeRaces();
    this.getBikeRiders();
  }

  logOutUser() {
    this.loginService.logout();
    location.reload();
  }

  getBikeRaces() {
    // this.adminService.getBikeRacesToCalculate().subscribe((result: any) => {
    //   debugger;
    //   this.bikeRaceDataSource = result;
    // }, error => { // error path;        
    // });

    
    this.bikeRaceDataSource = new DataSource({
      load: (loadOptions) => {
        debugger;
        return this.adminService.getBikeRacesToCalculate(this.navService.selectedYear, this.isAdmin).toPromise().catch(error =>  
          this.logOutUser()
        );
      },
      update: (key, values) => {
        debugger;
        var bikeRace = {
          BikeRaceDetailId: key.BikeRaceDetailId,
          BikeRaceId: key.BikeRaceId,
          Name: values.Name ? values.Name : key.Name,
          StartDate: values.StartDate ? values.StartDate : values.StartDateToddMMM ? values.StartDateToddMMM : key.StartDate,
          FinishDate: values.FinishDate ? values.FinishDate : values.FinishDateToddMMM ? values.FinishDateToddMMM : key.FinishDate,
          CountryName: values.CountryName ? values.CountryName : key.CountryName,
          NoOfStages: values.NoOfStages !== null && values.NoOfStages !== undefined ? values.NoOfStages : key.NoOfStages,
          BikeRaceCategoryId: 1,
          Cancelled: values.Cancelled !== undefined ? values.Cancelled : key.Cancelled,
        }
        let isMonument = values.IsMonument !== undefined ? values.IsMonument : key.IsMonument;
        let bikeRaceCategoryId = bikeRace.NoOfStages > 0 ? 3 : isMonument ? 2 : 1;
        bikeRace.BikeRaceCategoryId = bikeRaceCategoryId;
        // let projectId = values.ProjectId;
        // let timetypeId = values.TimeTypeId;
        // values.SelectedDate = this.selectedDate;
        // values.EmployeeId = this.selectedEmployeeId;
        return this.adminService.updateBikeRace(bikeRace).toPromise().catch(error =>  
          this.logOutUser()
        );
      },
      insert: (values) => {
        debugger;
        // values.SelectedDate = this.selectedDate;
        // values.EmployeeId = this.selectedEmployeeId;
        let startDate = moment(values.StartDateToddMMM);
        let finishDate = moment(values.FinishDateToddMMM);
        values.StartDateToddMMM = moment(startDate).toISOString();
        values.FinishDateToddMMM = moment(finishDate).toISOString();
        values.Year = this.navService.selectedYear;
        return this.adminService.addBikeRace(values, startDate.format("DD.MM.YYYY"), finishDate.format("DD.MM.YYYY")).toPromise().catch(error =>  
          this.logOutUser()
        );
      }, 
      remove: (key) => {
        debugger;
        return this.adminService.deleteBikeRaceDetail(key.BikeRaceDetailId).toPromise().catch(error =>  
          this.logOutUser()
        );
      } 
  });
  }

  onSelectionChanged(selectedRow, results: HTMLElement) {
    debugger;
    if (window.innerWidth < 800) {
      results.scrollIntoView();
    }
    this.selectedBikeRaceDetailId = selectedRow.selectedRowsData[0].BikeRaceDetailId;
    this.selectedBikeRaceIsStageRace = selectedRow.selectedRowsData[0].NoOfStages > 0;
    this.selectedBikeRaceCategoryId = selectedRow.selectedRowsData[0].BikeRaceCategoryId;
    this.createTabs();
    this.selectedTabIndex = 0;
    this.selectedBikeRaceName = selectedRow.selectedRowsData[0].Name;
    this.bikeRaceResultsDataSource = new CustomStore({
      key: "Position",
      load: (loadOptions) => {
        debugger;
        return this.adminService.getResultsToBikeRace(this.selectedBikeRaceDetailId).toPromise().catch(error =>  
          this.logOutUser()
        );
      },
      update: (key, values) => {
        debugger;
        let bikeRiderId = values.BikeRiderId != null ? values.BikeRiderId : -1;
        let position = key;
        return this.adminService.updateBikeRaceResult(this.selectedBikeRaceDetailId, bikeRiderId, position).toPromise().catch(error =>  
          this.logOutUser()
        );
        
      },
    });

    this.stageResultsDataSource = new CustomStore({
      load: (loadOptions) => {
        debugger;
        return this.adminService.getStageResultsToBikeRace(this.selectedBikeRaceDetailId).toPromise().catch(error =>  
          this.logOutUser()
        );
      },
      update: (key, values) => {
        debugger;
        let bikeRiderId = values.BikeRiderId;
        return this.adminService.updateStageResultToBikeRace(this.selectedBikeRaceDetailId, key.StageNo, key.StagePosition, bikeRiderId).toPromise().catch(error =>  
          this.logOutUser()
        );
      },
    });
  
    // this.adminService.getStageResultsToBikeRace(this.selectedBikeRaceId).subscribe((result: any) => {
    //   debugger;
    //   this.stageResultsDataSource = result;
    // }, error => {
    // });

    if (this.selectedBikeRaceCategoryId == 4 || this.selectedBikeRaceCategoryId == 5)
    this.leaderJerseyDataSource = new CustomStore({
      // key: this.keyExprLeaderJersey,
      load: (loadOptions) => {
        debugger;
        return this.adminService.getLeaderJerseyResultsToBikeRace(this.selectedBikeRaceDetailId).toPromise().catch(error =>  
          this.logOutUser()
        );
      },
      update: (key, values) => {
        debugger;
        let bikeRiderId = values.BikeRiderId;
        return this.adminService.updateLeaderJerseyResult(this.selectedBikeRaceDetailId, bikeRiderId, key.LeaderJerseyId, key.LeaderJerseyPosition).toPromise().catch(error =>  
          this.logOutUser()
        );
      },
    });
  }


  getBikeRiders() {
    debugger;
    // project
    this.bikeRidersDataSource = new CustomStore({
      key: "BikeRiderId",
      load: (loadOptions) => {
        if (loadOptions.searchValue != null) {
          if (loadOptions.searchValue.length > 2) {
          return this.adminService.getBikeRidersBySearchTextByYear(loadOptions.searchValue.toString(), this.navService.selectedYear).toPromise().catch(error =>  
            this.logOutUser()
          );
          }
          else {
            return [{BikeRiderId: -1, BikeRiderName: " "}];
          }

        }
        else {
          return this.adminService.getBikeRidersBySearchTextByYear("", this.navService.selectedYear).toPromise().catch(error =>  
            this.logOutUser()
          );
          //return "";
        }
      },
      byKey: (key) => {
        return this.adminService.getBikeRiderById(key).toPromise().catch(error =>  
          this.logOutUser()
        );
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

  onStageResultChanged(e, stageNo, stagePosition) {
    debugger;
    if (e.value != -1) {
      this.adminService.updateStageResultToBikeRace(this.selectedBikeRaceDetailId, stageNo, stagePosition, e.value).toPromise().catch(error =>  
        this.logOutUser()
      );
    }
  }

  onRowUpdated(e) {
    debugger;
    var grid = e.component;
  }

  onUpdateBikeRaceResults(e, x) {
  }

  onFocusOutBikeRider(e) {
  }

  //tab to minute field when tabbing from hour field. default behaviour of datagrid is tabbing to next gridcolumn
  onKeyDownBikeRider(e) {
  }

  onRowPrepared(e) {
    debugger;
    if (e.rowType === "data") {
      if (e.data.IsCalculated) {
        e.rowElement.style.background = "#42C436";
        e.rowElement.style.color = "black";
      }
    }
  }

  createTabs() {
    debugger;
    if (this.selectedBikeRaceIsStageRace) {
      if (this.selectedBikeRaceCategoryId == 4 || this.selectedBikeRaceCategoryId == 5) {
        this.tabs = [
          {     
              id: 0,
              text: "Sammenlagt", 
          },
          { 
              id: 1,
              text: "Etapper",  
          },
          { 
              id: 2,
              text: "Trøyer",  
          }
        ];
      }
      else {
        this.tabs = [
          {     
              id: 0,
              text: "Sammenlagt", 
          },
          { 
              id: 1,
              text: "Etapper",  
          }
        ];
      }
    }
    else {
      this.tabs = [
        {     
            id: 0,
            text: "Total", 
        }
    ];
    }
  }

  selectTab(e) {
    debugger;
    this.selectedTabIndex = e.itemData.id;
  }
  

  focusDate(e) {
    e.event.target.select();
  }
  

  onStartDateChanged(e, cell) {
    debugger;
    cell.data.StartDate = e.value;
    // let dt = moment(e.value);
    // var nb = moment(dt).locale('nb');
    // let dayname = nb.format('dddd');
    // cell.data.Date_DayName = dayname;
    // let dateDDMMYYYY = nb.format('dddd DD.MM.YYYY');
    // cell.data.Date_Str = dateDDMMYYYY;
    // let weekno = nb.format('W');
    // cell.data.WeekNo = nb.isValid() ? weekno : "";
    // let dateValue = {
    //   Date: e.value,
    //   Date_DayName: dayname,
    //   Date_Str: dateDDMMYYYY,
    //   WeekNo: nb.isValid() ? weekno : "",
    // };
    cell.setValue(e.value);
  }

  onFinishDateChanged(e, cell) {
    debugger;
    cell.data.FinishDate = e.value;
    cell.setValue(e.value);
  }
}
