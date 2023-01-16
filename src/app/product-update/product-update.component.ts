import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerService } from '../services/seller.service';
import { products } from './../data-type';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  form: undefined | products;
  productMessage: undefined | string;
  constructor(private route: ActivatedRoute,
    private seller: SellerService, 
    private router: Router) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    // console.log(productId);
    productId && this.seller.productUpdate(productId).subscribe((data) => {
      // console.log(data);
      this.form = data
    })
  }

  submit(data: any) {
    // console.log(data);
    if(this.form){
      data.id = this.form.id;
    }
    this.seller.UpdateProduct(data).subscribe((res) =>{
      if(res){
        this.productMessage = "Product has Updated"
      }
    });
    setTimeout(() => { this.productMessage = undefined
      
    }, 3000);
    this.router.navigate(['seller-home']);
  }

}
