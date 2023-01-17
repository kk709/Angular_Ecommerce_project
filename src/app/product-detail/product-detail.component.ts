import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerService } from './../services/seller.service';
import { products } from './../data-type';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productDetail: undefined | products
  num = 0;

  constructor(private activeRoute: ActivatedRoute, private route: Router, private seller: SellerService) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    // console.log(productId);

    productId && this.seller.productUpdate(productId).subscribe((res) => {
      // console.log(res);
      this.productDetail = res;
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
  

}
