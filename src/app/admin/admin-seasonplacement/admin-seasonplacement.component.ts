import { Component, OnInit, Input } from '@angular/core';
import { NavService } from '../../core/nav/nav.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-seasonplacement',
  templateUrl: './admin-seasonplacement.component.html',
  styleUrls: ['./admin-seasonplacement.component.css']
})
export class AdminSeasonplacementComponent implements OnInit {

  @Input() updateBikeRaces = true;
  bikeRaces: any[];
  selectedBikeRaces: any[];

  loadingVisible = false;

  constructor(private adminService: AdminService, private navService: NavService) { }

  ngOnInit() {
    this.getBikeRaces();
  }

  getBikeRaces() {
    
    this.loadingVisible = true;
    let year = this.navService.selectedYear;
    this.adminService.getBikeRacesToCalculate(this.navService.selectedYear, false).subscribe((result: any) => {
      debugger;
      this.loadingVisible = false;
      this.bikeRaces = result;
      this.getBikeRaceSeasonPlacement();
    }, error => { // error path;   
      this.loadingVisible = false;     
    });
  }

  getBikeRaceSeasonPlacement() {
    
    this.loadingVisible = true;
    let year = this.navService.selectedYear;
    this.adminService.getBikeRaceSeasonPlacement(this.navService.selectedYear).subscribe((result: any) => {
      debugger;
      this.loadingVisible = false;
      this.selectedBikeRaces = [];
      result.forEach(sp => {
        debugger;
        this.selectedBikeRaces.push(sp.BikeRaceDetailId);
      });
    }, error => { // error path;   
      this.loadingVisible = false;     
    });
  }

  onSelectedBikeRacesChanged(e) {
    debugger;
    if (this.updateBikeRaces) {
      this.loadingVisible = true;
      this.adminService.updateBikeRaceSeasonPlacement(this.navService.selectedYear, this.selectedBikeRaces).subscribe((result: any) => {
        debugger;
        this.loadingVisible = false;
      }, error => { // error path;   
        this.loadingVisible = false;     
      });
    }
  }

}
