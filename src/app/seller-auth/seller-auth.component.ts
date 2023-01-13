import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { login, signUp } from '../data-type';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  // userData:any = ''
  showLogin=false;
  authError:string = '';
  // signupform = ({
  //   name:'',
  //   email:'',
  //   password:''
  // })

  

  constructor(private seller:SellerService, private router:Router) { }

  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  

  signup(data:signUp): void {
    this.seller.userSignup(data);
    alert("Successfully Signup")
          
  };

    // this.userData = data
    // console.log(this.seller.userSignup(data))
  

  login(data:login): void {
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if(isError){
        this.authError = "Invalid Cradentials"
      }
    })
    // this.seller.userSignup(data)
    // this.userData = data
    // console.log(this.seller.userSignup(data))
  }

  openLogin(){
    this.showLogin=true;
  }
  openSigup(){
    this.showLogin=false;
  }

}
