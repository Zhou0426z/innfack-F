import {
  Component,
  OnInit,
  AfterViewInit,
  Renderer2,
  ɵConsole,
  Input,
} from "@angular/core";
import Swiper from "swiper";
import { ProductService } from "src/Service/product-service";
import { InProductVM } from "src/ViewModels/In/in-product-vm";
import { Guid } from "guid-typescript";
import { InAsideProductsVM } from "src/ViewModels/In/in-aside-products-vm";
import { ActivatedRoute } from "@angular/router";
import { OutCartVM } from "src/ViewModels/Out/out-cart-vm";
import { CartService } from "src/Service/cart-service";
import { FavoriteService } from 'src/Service/favorite-service';
import { OutFavoriteVM } from 'src/ViewModels/Out/out-favorite-vm';

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements AfterViewInit, OnInit {
  constructor(
    private renderer: Renderer2,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private favoriteService :FavoriteService
  ) {}
  product: InProductVM = new InProductVM();
  aboutProducts: InAsideProductsVM[] = [];
  productNo: string;
  quantity: number = 1;
  swiper: Swiper;
  // outCartVM: OutCartVM = new OutCartVM();
  ngOnInit(): void {
    this.productNo = 
      this.activatedRoute.snapshot.paramMap.get("productNo");
    this.productService.getProduct(this.productNo).subscribe((data) => {
      this.product = data;
      this.productService
      .getAboutProducts(data.productID)
      .subscribe((data) => (this.aboutProducts = data));

    });
  }

  ngAfterViewInit() {
    var galleryThumbs = new Swiper(".gallery-thumbs", {
      spaceBetween: 10,
      slidesPerView: 4,
      observer: true,
      observeParents: true,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    var galleryTop = new Swiper(".gallery-top", {
      spaceBetween: 10,
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: galleryThumbs,
      },
    });
    var swiper = new Swiper("#swiper-about", {
      slidesPerView: 3,
      spaceBetween: 30,
      observer: true,

      slidesPerGroup: 3,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  styleChoose($event: any, index: number) {
    for (var i = 0; i < $event.target.parentNode.children.length; i++) {
      this.renderer.removeClass(
        $event.target.parentNode.children[i],
        "choosed"
      );
    }
    this.renderer.addClass($event.target, "choosed");
  }
  addQuantity($event: any) {
    this.quantity += 1;
    if (this.quantity > this.product.stock) {
      this.quantity = this.product.stock;
    }
    $event.target.previousSibling.value = this.quantity;
  }
  reduceQuantity($event: any) {
    if (this.quantity > 1) {
      this.quantity -= 1;
      $event.target.nextSibling.value = this.quantity;
    }
  }

  show($event: any) {
    if (
      isNaN(+$event.target.value) == false &&
      +$event.target.value > this.product.stock
    ) {
      this.quantity = this.product.stock;
      $event.target.value = this.quantity;
      return;
    }
    if (isNaN(+$event.target.value) == false) {
      this.quantity = +$event.target.value;
      return;
    }
    this.quantity = 1;
    $event.target.value = 1;
  }

  addCart() {
    var outCartVM = new OutCartVM();
    var accountID = Guid.parse(localStorage.getItem("id")).toJSON().value;
    outCartVM.accountID = accountID;
    outCartVM.productID = this.product.productID;
    outCartVM.quantity = this.quantity;
    this.cartService.addCart(outCartVM).subscribe();
    alert("已加入購物車");
  }
  addOtherCart(productID :Guid)
  {
    var outCartVM = new OutCartVM();
    var accountID = Guid.parse(localStorage.getItem("id")).toJSON().value;
    outCartVM.accountID = accountID;
    outCartVM.productID = productID;
    outCartVM.quantity = 1;
    this.cartService.addCart(outCartVM).subscribe();
    alert("已加入購物車");

  }
  addFavorite(){
    var outFavoriteVM = new OutFavoriteVM();
    var accountID = Guid.parse(localStorage.getItem("id")).toJSON().value;
    outFavoriteVM.accountID = accountID;
    outFavoriteVM.productID = this.product.productID;
    this.favoriteService.addFavorite(outFavoriteVM).subscribe();
    alert("已加入最愛");
  }

}
