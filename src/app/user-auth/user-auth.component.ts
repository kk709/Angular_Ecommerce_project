import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { UserServiceService } from '../services/user-service.service';
import { cart, login, products, signUp } from './../data-type';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  signupMessage: string | undefined
  LoginMessage: string | undefined
  formtoggle = false;
  constructor(private _user: UserServiceService, private seller:SellerService) { }

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

  localCartToRemoveCart(){
    let data = localStorage.getItem('localCart');
    let user  = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id
    if(data){
      let cartDataList:products[] = JSON.parse(data)
      
      cartDataList.forEach((product:products, index) => {
        let cartData:cart = {
          ...product,
          productId: product.id,
          userId
        }
        delete cartData.id;
        setTimeout(() => {
          this.seller.AddToCart(cartData).subscribe((res:any) => {
          if(res){
            console.log("Item Stored in DB")
          }
        })
        if(cartDataList.length===index+1){
          localStorage.removeItem('localCart')
        }
        }, 1000);
      });
    }
    setTimeout(() => {
      this.seller.getCartData(userId)
    }, 2000);
  }

}
