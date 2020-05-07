import { Component, OnInit, Renderer2 } from "@angular/core";
import { CategoryService } from "src/Service/category-service";
import { Categories } from "src/Models/categories";
import { ProductService } from "src/Service/product-service";
import { InCollectionProductsVM } from "src/ViewModels/In/in-collection-products-vm";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { Guid } from 'guid-typescript';
import { CartService } from 'src/Service/cart-service';
import { OutCartVM } from 'src/ViewModels/Out/out-cart-vm';
import { OutFavoriteVM } from 'src/ViewModels/Out/out-favorite-vm';
import { FavoriteService } from 'src/Service/favorite-service';

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
    private cartService :CartService,
    private favoriteService: FavoriteService
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.category = this.activatedRoute.snapshot.paramMap.get("category");
        this.productService
          .getCollectionProducts(this.category)
          .subscribe(data => {
            this.products = data;
            this.categoryName = data[0].categoryName;
          });
      }
    });
  }
  asideCategories: Categories[];
  products: InCollectionProductsVM[] = [];
  categoryName: string = "";
  category: string;
  isBlockStyle = false;
  a=false;
  ngOnInit() {
    this.categoryService
      .getAsideCategories()
      .subscribe(data => (this.asideCategories = data));
  }

  toBlock($event: any) {
    this.isBlockStyle = true;
    this.renderer.removeClass(
      $event.target.parentNode.previousSibling.childNodes[0],
      "iHover"
    );
    this.renderer.addClass($event.target, "iHover");
  }
  toList($event: any) {
    this.isBlockStyle = false;
    this.renderer.removeClass(
      $event.target.parentNode.nextSibling.childNodes[0],
      "iHover"
    );
    this.renderer.addClass($event.target, "iHover");
  }

  imgHover($event: any) {
    this.renderer.addClass($event.target.childNodes[0], "imgHover");
    this.renderer.removeStyle($event.target.childNodes[1], "display");
  }
  imgLeave($event: any) {
    this.renderer.removeClass($event.target.childNodes[0], "imgHover");
    this.renderer.setStyle($event.target.childNodes[1], "display", "none");
  }

  addCart(productID:Guid){
    var outCartVM = new OutCartVM();
    var accountID = Guid.parse(localStorage.getItem("id")).toJSON().value;
    outCartVM.accountID = accountID;
    outCartVM.productID = productID;
    outCartVM.quantity = 1;
    this.cartService.addCart(outCartVM).subscribe();
    alert("已加入購物車");
  }
  addFavorite(productID:Guid){
    var outFavoriteVM = new OutFavoriteVM();
    var accountID = Guid.parse(localStorage.getItem("id")).toJSON().value;
    outFavoriteVM.accountID = accountID;
    outFavoriteVM.productID = productID;
    this.favoriteService.addFavorite(outFavoriteVM).subscribe();
    alert("已加入最愛");
  }
}
