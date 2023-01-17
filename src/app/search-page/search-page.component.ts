import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { products } from '../data-type';
import { SellerService } from './../services/seller.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  searchResult: undefined | products[];

  constructor(private activeRoute:ActivatedRoute, private seller: SellerService, private route: Router) { }

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    // console.warn(query);
    query && this.seller.searchProduct(query).subscribe((res) => {
        this.searchResult = res;
        
    })
  }

}
