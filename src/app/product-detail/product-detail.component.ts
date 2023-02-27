import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerService } from './../services/seller.service';
import { cart, products } from './../data-type';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productDetail: undefined | products
  num = 0;
  removeCart = false

  constructor(private activeRoute: ActivatedRoute, private route: Router, private seller: SellerService) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    // console.log(productId);

    productId && this.seller.productUpdate(productId).subscribe((res) => {
      // console.log(res);
      this.productDetail = res;

      let cartData = localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item: products) =>productId == item.id.toString())
        if(items.length){
          this.removeCart  = true
        }else{
          this.removeCart = false
        }
      }
    })

  }

  add(){
    this.num++
  }

  sub(){
    if(this.num<=0){
      
      this.num = 0;
    }else{
      this.num--
    }
    
  }

  AddToCart(){
    if(this.productDetail){
      this.productDetail.quantity = this.num;
      if(!localStorage.getItem('user')){
        this.seller.localAddToCart(this.productDetail);
        this.removeCart  = true
      }else{
        let user  = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id
        let cartData:cart = {
          ...this.productDetail,
          userId,
          productId:this.productDetail.id,
        }
        delete cartData.id
        this.seller.AddToCart(cartData).subscribe((res:any) =>{
          this.removeCart = true
        })
      }
    }
  }

  RemoveToCart(productId:number){
    this.seller.removeItemToCart(productId);
    this.removeCart  = false

  }
  

}
