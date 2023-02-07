import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { login, signUp } from './../data-type';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  signupMessage: string | undefined
  LoginMessage: string | undefined
  formtoggle = false;
  constructor(private _user: UserServiceService) { }

  ngOnInit(): void {
    this._user.userReload();
  }

  signup(data:signUp): void {
    this._user.userSignup(data)
    this.signupMessage = "SignUp successful go to login..";

    setTimeout(() => { this.signupMessage = undefined
      
    }, 3000);
  }
  login(data:login){
    // console.log(data);
    this._user.userLogin(data)
    this.LoginMessage = "Login Successful.."
  }

  openSigup(){
    this.formtoggle = true
  }

  openLogin(){
    this.formtoggle = false
  }

}
