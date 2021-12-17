import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

import { DxTextBoxComponent } from 'devextreme-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;
  data: any;
  username: string;
  password: string;
  loadPanelVisible = false;

  @ViewChild('userTextBox', {static:false}) userInput: DxTextBoxComponent
    
  constructor(private router: Router, private zone: NgZone, private loginService: LoginService) {    
  }

  ngOnInit() {
    // if (this.userService.isLoggedIn) {
    //   this.zone.run(() => this.router.navigate(['/results']));
    // }
  }

  ngAfterViewInit() {
    this.userInput.instance.focus();
  }

  loginClick() {
    this.loadPanelVisible = true;

    this.loginService.login(this.username, this.password)
      .subscribe((result: any) => { // success path
        debugger;
        this.loadPanelVisible = false;
        debugger;
        if (!result.IsLoggedIn) {
          this.message = "Feil brukernavn eller passord";
        } else {
          location.reload();
        }
      },
        error => { // error path;
          this.loadPanelVisible = false;
          // this.message = error.message;
        }
      );
  }

}
