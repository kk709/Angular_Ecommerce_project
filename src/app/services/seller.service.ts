import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { products } from './../data-type';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLogGedIn = new BehaviorSubject<boolean>(false)
  isLoginError = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }

  _api_url = 'http://localhost:3000/';
  private _sellersignup = this._api_url.concat('seller');
  private _productsAdd = this._api_url.concat('products');
  private _productsList = this._api_url.concat('products');
  // private _deleteProduct = this._api_url.concat(`products/?id=${id}`)



  userSignup(data: signUp) {
    this.http.post(this._sellersignup, data, { observe: 'response' })
      .subscribe((result) => {

        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-auth']);
        // alert("successfuly signup /n please go to login page");

      });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLogGedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: login) {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: "response" })
      .subscribe((result: any) => {
        if (result && result.body && result.body.length) {
          // console.log("User Logged In")
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        } else {
          // alert("Invalid Cradentials");
          this.isLoginError.next(true);
        }
      })
  }

  addProducts(data: products) {
    return this.http.post(this._productsAdd, data,);

  }

  productList() {
    return this.http.get<products[]>(this._productsList);
  }
  productDelete(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }
  productUpdate(id: string) {
    return this.http.get<products>(`http://localhost:3000/products/${id}`)
  }
  UpdateProduct(product:products){
    return this.http.put<products>(`http://localhost:3000/products/${product.id}`,product);
  }


}
