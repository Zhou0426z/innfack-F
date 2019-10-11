import {
  Component,
  OnInit,
  AfterViewInit,
  Renderer2,
  ɵConsole
} from "@angular/core";
import Swiper from "swiper";
import { ProductService } from "src/Service/product-service";
import { InProductVM } from "src/ViewModels/In/in-product-vm";
import { Guid } from "guid-typescript";
import { InAsideProductsVM } from 'src/ViewModels/In/in-aside-products-vm';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"]
})
export class ProductDetailComponent implements AfterViewInit, OnInit {
  constructor(
    private renderer: Renderer2,
    private productService: ProductService,
    private activatedRoute : ActivatedRoute,
  ) {}

  ngOnInit(): void {
    var productID = Guid.parse(this.activatedRoute.snapshot.paramMap.get('productID'));
    this.productService.getProduct(productID).subscribe(data => {
      this.product = data;
      this.getSpecification();
    });
    this.productService
      .getAboutProducts(productID)
      .subscribe(data => this.aboutProducts = data);
  }
  product: InProductVM = new InProductVM();
  aboutProducts: InAsideProductsVM[] = [];
  productNo: string = "";
  quantity: number = 1;
  stock: string = "";
  specification: string[] = [];
  swiper: Swiper;

  ngAfterViewInit() {
    var galleryThumbs = new Swiper(".gallery-thumbs", {
      spaceBetween: 10,
      slidesPerView: 4,
      observer: true,
      observeParents: true,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true
    });
    var galleryTop = new Swiper(".gallery-top", {
      spaceBetween: 10,
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      thumbs: {
        swiper: galleryThumbs
      }
    });
    var swiper = new Swiper("#swiper-about", {
      slidesPerView: 3,
      spaceBetween: 30,
      observer: true,

      slidesPerGroup: 3,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
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
    this.productNo = this.product.productDetails[index].productDetailName;
    this.stock = this.product.productDetails[index].stock.toString();
  }
  addQuantity() {
    this.quantity += 1;
  }
  reduceQuantity() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  show($event: any) {
    if (isNaN(+$event.target.value) == false) {
      this.quantity = +$event.target.value;
      return;
    }
    this.quantity = 1;
  }

  getSpecification() {
    for (var i = 0; i < this.product.productDetails.length; i++) {
      this.specification.push(this.product.productDetails[i].specification);
    }
  }
}
