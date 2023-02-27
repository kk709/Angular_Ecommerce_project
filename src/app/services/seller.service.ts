import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { cart, login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { products } from './../data-type';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  cartData = new EventEmitter<products[]| []>();

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
  UpdateProduct(product:products,){
    return this.http.put<products>(`http://localhost:3000/products/${product.id}`,product);
  }
  popularProduct(){
    return this.http.get<products[]>(this._productsList+'?_limit=9');
  }
  searchProduct(query:string){
    return this.http.get<products[]>(this._productsList+`?q=${query}`);
  }

  localAddToCart(data:products){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart', JSON.stringify([data]));
    }else{
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeItemToCart(productId:number){
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      let items:products[] = JSON.parse(cartData)
      items = items.filter((item:products) =>productId !== item.id)
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  AddToCart(cartData:cart){
    return this.http.post('http://localhost:3000/cart', cartData)
  }

  getCartData(userId:number){
    return this.http.get('http://localhost:3000/cart?userId='+userId, { observe: 'response' }).subscribe((res:any) =>{
      if(res && res.body){
        this.cartData.emit(res.body);
      }
    })
  }

}
