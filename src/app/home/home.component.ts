import { Component, OnInit } from '@angular/core';
import { SellerService } from './../services/seller.service';
import { products } from './../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private seller: SellerService) { }
  popularProducts: products[] | undefined;
  ngOnInit(): any {
    this.seller.popularProduct().subscribe((res) => {
      this.popularProducts = res
    })

    // this.seller.testapi().subscribe((res:any) => {
    //   console.log(res);
    // })
  }

}
