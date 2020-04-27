import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IndexComponent } from "./index/index.component";
import { ProductsComponent } from "./products/products.component";
import { AccountComponent } from "./account/account.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { AccountIndexComponent } from "./account-index/account-index.component";

const routes: Routes = [
  // {path:'',redirectTo:'/home/index',pathMatch:'full'},
  { path: "index", component: IndexComponent },
  { path: "collection", component: ProductsComponent },
  { path: "collection/:category", component: ProductsComponent },
  { path: "account", component: AccountComponent },
  { path: "login", component: LoginComponent },
  { path: "AccountIndex", component: AccountIndexComponent },

  { path: "product/:productID", component: ProductDetailComponent },
  { path: "", redirectTo: "/AccountIndex", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
