import { Component, OnInit } from '@angular/core';
import { LoginService } from './../login.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  username: string;
  password: string;
  repeatPassword: string;
  errorMessage: string;

  constructor(private loginService: LoginService) {
    
   }

  ngOnInit() {
    
  }

  signupClicked() {
    
    this.errorMessage = "";
    if (this.password === this.repeatPassword) {
      this.loginService.signup(this.username, this.password).subscribe((result: any) => {
         
      }, error => { // error path;        
      });
    }
    else {
      this.errorMessage = "Passord samsvarer ikke";
    }
  }

}
