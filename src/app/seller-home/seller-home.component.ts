import { Component, OnInit } from '@angular/core';
import { SellerService } from './../services/seller.service';
import { products } from './../data-type';
import {
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  updateId: any;
  updateId_temp:any = {};

  constructor(private product:SellerService, 
    private modalService:NgbModal, 
    private router:Router) { }

  ListOfProduct: undefined | products[];
  addProductMessage: string | undefined;
  // product_id: any;
  // del_prodTemp = {};
  
  
  ngOnInit(): void {
    this.list();
  }
  delete(id:number){
    console.log("test id", id);
    this.product.productDelete(id).subscribe((res) => {
      if(res){
        this.addProductMessage = "Product deleted Successfully";
        this.list();
      }
    });
    setTimeout(() => { this.addProductMessage = undefined
        
    }, 3000);
    this.ngOnInit();
  }

  
  list(){
    this.product.productList().subscribe((result)=>{
      // console.log(result);
      this.ListOfProduct=result;
    })
  }

  // update(id){
  //   this
  // }
}
