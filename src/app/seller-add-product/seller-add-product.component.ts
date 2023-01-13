import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from './../services/seller.service';
import { products } from './../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;
  constructor(private router:Router, private seller: SellerService) { }

  ngOnInit(): void {
  }

  submit(data:products): void{
    this.seller.addProducts(data).subscribe((result)=>{
      if(result){
        this.addProductMessage = 'Product is Added Successfully';
        // this.router.navigate(['seller-home']);
      }
      setTimeout(() => {this.addProductMessage = undefined
        
      }, 3000);
      
    });
    // alert("Product added successfully");
  }

}
