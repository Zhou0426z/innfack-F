import { Component, ContentChild, OnInit, ElementRef } from "@angular/core";
import { CategoryService } from "src/Service/category-service";
import { Categories } from "src/Models/categories";
import { CartService } from "src/Service/cart-service";
import { Guid } from "guid-typescript";

@Component({
  selector: "layout",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private cartService: CartService
  ) {}
  cartCount = 0;
  ngOnInit(): void {
    this.categoryService
      .getHeaderCategories()
      .subscribe((data) => (this.headerCategories = data));
    if (localStorage.getItem("id")) {
      var accountID = Guid.parse(localStorage.getItem("id"));
      this.cartService
        .getCart(accountID)
        .subscribe((data) => (this.cartCount = data.length));
    }
  }
  public headerCategories: Categories[];
}
