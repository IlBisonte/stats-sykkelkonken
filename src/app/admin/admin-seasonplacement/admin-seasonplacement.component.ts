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
    this.adminService.getBikeRacesToCalculate_adminSeasonplacement(this.navService.selectedYear).subscribe((result: any) => {
      
      this.loadingVisible = false;
      this.bikeRaces = result;
      this.getBikeRaceSeasonPlacement();
    }, error => { // error path;   
      this.loadingVisible = false;     
    });
  }

  getBikeRaceSeasonPlacement() {
    
    this.loadingVisible = true;
    this.adminService.getBikeRaceSeasonPlacement(this.navService.selectedYear).subscribe((result: any) => {
      
      this.loadingVisible = false;
      this.selectedBikeRaces = [];
      result.forEach(sp => {
        
        this.selectedBikeRaces.push(sp.BikeRaceDetailId);
      });
    }, error => { // error path;   
      this.loadingVisible = false;     
    });
  }

  onSelectedBikeRacesChanged(e) {
    
    if (this.updateBikeRaces) {
      this.loadingVisible = true;
      this.adminService.updateBikeRaceSeasonPlacement(this.navService.selectedYear, this.selectedBikeRaces).subscribe((result: any) => {
        
        this.loadingVisible = false;
      }, error => { // error path;   
        this.loadingVisible = false;     
      });
    }
  }

}
