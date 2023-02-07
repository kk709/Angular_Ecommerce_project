import { Injectable } from '@angular/core';
import { login, signUp } from './../data-type';
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
      this.route.navigate(['/user-auth']);
    })
  }
  
  userReload(){
    if(localStorage.getItem('user')){
      this.route.navigate(['/']);
    }
  }

  userLogin(data:login){
    this.http.get<signUp[]>(this._api_url.concat(`users?email=${data.email}&password=${data.password}`), { observe: "response" })
    .subscribe((result) => {
      if(result && result.body){
        localStorage.setItem('user', JSON.stringify(result.body[0]))
        this.route.navigate(['/']);
      }
    })
  }
}
 