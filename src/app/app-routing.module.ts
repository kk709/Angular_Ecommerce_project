import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UserAuthComponent } from './user-auth/user-auth.component';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'seller-auth',
    component:SellerAuthComponent
  },
  {
    path:'seller-home',
    canActivate:[AuthGuard],
    component:SellerHomeComponent
  },
  {
    path: 'seller-add-product',
    canActivate:[AuthGuard],
    component:SellerAddProductComponent
  },
  {
    path:'product-update/:id',
    canActivate:[AuthGuard],
    component:ProductUpdateComponent
  },
  {
    path:'search/:query',
    component:SearchPageComponent
  },
  {
    path:'detail/:productId',
    component:ProductDetailComponent
  },
  {
    path:'user-auth',
    component:UserAuthComponent
  },
  {
    path:'**',
    component:ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
