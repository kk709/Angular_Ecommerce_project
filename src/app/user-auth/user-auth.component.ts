import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { signUp } from './../data-type';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  signupMessage: string | undefined
  constructor(private _user: UserServiceService) { }

  ngOnInit(): void {
  }

  signup(data:signUp): void {
    this._user.userSignup(data)
    this.signupMessage = "SignUp successful..";

    setTimeout(() => { this.signupMessage = undefined
      
    }, 3000);
  }

}
