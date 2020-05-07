import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IndexComponent } from "./index/index.component";
import { ProductsComponent } from "./products/products.component";
import { AccountComponent } from "./account/account.component";
import { HttpClientModule } from "@angular/common/http";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductService } from "src/Service/product-service";
import { ImageService } from "src/Service/image-service";
import { CategoryService } from "src/Service/category-service";
import { FbService } from "src/Service/fb-service";
import { LineService } from "src/Service/line-service";
import { AccountService } from "src/Service/account-service";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { AccountIndexComponent } from "./account-index/account-index.component";
import { CartComponent } from "./cart/cart.component";
import { MyAccountComponent } from "./my-account/my-account.component";
import { EidtAccountComponent } from "./my-account/eidt-account/eidt-account.component";
import { CartService } from "src/Service/cart-service";
import { Element } from "@angular/compiler/src/render3/r3_ast";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { OrderService } from 'src/Service/order-service';
import { FavoriteService } from 'src/Service/favorite-service';
import { EditPasswordComponent } from './my-account/edit-password/edit-password.component';
import { FavoriteListComponent } from './my-account/favorite-list/favorite-list.component';
import { OrderSearchComponent } from './my-account/order-search/order-search.component';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ProductsComponent,
    AccountComponent,
    ProductDetailComponent,
    LoginComponent,
    AccountIndexComponent,
    CartComponent,
    MyAccountComponent,
    EidtAccountComponent,
    EditPasswordComponent,
    FavoriteListComponent,
    OrderSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    ProductService,
    ImageService,
    CategoryService,
    FbService,
    LineService,
    AccountService,
    CartService,
    FavoriteService,
    OrderService,
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
