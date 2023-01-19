import { Injectable } from '@angular/core';
import { signUp } from './../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient, private route: Router) { }

  _api_url = 'http://localhost:3000/';

  userSignup(user:signUp){
    // console.log(user);
    this.http.post(this._api_url.concat('users'), user, {observe: 'response'}).subscribe((res) => {
      // console.log(res);
      localStorage.setItem('user', JSON.stringify(res.body))
      this.route.navigate(['/']);
    })
  }
}
 