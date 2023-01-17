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
  sellerName: any;
  searchResult: undefined | products[];
  constructor(private route:Router, private seller: SellerService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val:any) => {
      // console.log(val.url);
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          console.log('inside seller area');
          this.menuType="seller";
          if(localStorage.getItem("seller")){
            let sellerStore = localStorage.getItem("seller");
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        }else{
          console.log('outside seller');
          this.menuType="default";
        }
      }
    })
  }
  logout(){
    localStorage.removeItem("seller");
    this.route.navigate(['']);
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
