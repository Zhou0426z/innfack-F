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
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { AccountIndexComponent } from './account-index/account-index.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ProductsComponent,
    AccountComponent,
    ProductDetailComponent,
    LoginComponent,
    AccountIndexComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService,
    ImageService,
    CategoryService,
    FbService,
    LineService,
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
