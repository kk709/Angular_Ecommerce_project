import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from './../services/seller.service';
import { products } from './../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType:string = 'default';
  sellerName: string = "";
  searchResult: undefined | products[];
  userName: string ="";
  cartItems = 0
  constructor(private route:Router, private seller: SellerService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val:any) => {
      // console.log(val.url);
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          if(localStorage.getItem('seller')){
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
            this.menuType='seller';
          }else if(localStorage.getItem('user')){
            let userStore = localStorage.getItem('user');
            let userData = userStore && JSON.parse(userStore)[0];
            this.userName = userData.name;
            this.menuType = 'user';
          }
        }else{
          // console.log('outside seller');
          this.menuType='default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart')
    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    }
    this.seller.cartData.subscribe((items) => {
      this.cartItems = items.length;
    })
  }
  logout(){
    localStorage.removeItem("seller");
    this.route.navigate(['']);
  }

  userLogout(){
    localStorage.removeItem("user");
    this.route.navigate(['user-auth']);
  }

  searchproducts(query:KeyboardEvent){
    if(query){
      const element= query.target as HTMLInputElement;
      this.seller.searchProduct(element.value).subscribe((res) => {
        if(res.length>5){
          res.length=5;
        }
        this.searchResult = res;
      })
    }
  }
  
  search(){
    this.searchResult=undefined;
  }

  submitsearch(val:string){
    if(val == ''){
      this.ngOnInit();
    }else{
      this.route.navigate([`search/${val}`])
    }
    // console.log(val);

  }

  redirectToDetail(id:number){
    this.route.navigate([`/detail/${id}`])

  }

}
