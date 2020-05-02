import {
  Component,
  OnInit,
  AfterViewInit,
  Renderer2,
  ElementRef,
  ViewChild,
  Inject,
} from "@angular/core";
import { CartService } from "src/Service/cart-service";
import { Guid } from "guid-typescript";
import { InCartVM } from "src/ViewModels/In/in-cart-vm";
import { DOCUMENT } from "@angular/common";
import { OutCartVM } from "src/ViewModels/Out/out-cart-vm";
import { stringify } from "querystring";
import { CartAnimation } from "./cart-animation";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
  animations: CartAnimation,
})
export class CartComponent implements OnInit, AfterViewInit {
  constructor(private cartService: CartService, private renderer: Renderer2) {}
  private accountID: Guid;
  private inCartVM: InCartVM[];
  private price: number = 0;
  private freight: number = 0;
  private totalPrice: number;
  private totalCount: number = 0;
  private unitPrice: number[] = [];
  private toStore = true;
  private payFirst = false;
  private animationState = "in";
  ngOnInit(): void {}
  ngAfterViewInit() {
    this.getCartData();
  }

  async getCartData() {
    this.accountID = Guid.parse(localStorage.getItem("id"));
    await this.cartService
      .getCart(this.accountID)
      .toPromise()
      .then((data) => {
        this.inCartVM = data;
        this.totalCount = data.length;
      });
    this.price = 0;
    for (var i = 0; i < this.inCartVM.length; i++) {
      this.price += this.inCartVM[i].price * this.inCartVM[i].quantity;
      this.unitPrice[i] = this.inCartVM[i].price * this.inCartVM[i].quantity;
    }
    if (this.price > 300) {
      this.freight = 0;
    }
    this.totalPrice = this.price + this.freight;
  }

  quantityPlus($event: any) {
    $event.target.previousSibling.value =
      Number($event.target.previousSibling.value) + 1;

    this.update($event, "plus");
  }
  quantityMinus($event: any) {
    console.log($event.target.parentNode.parentNode.className);

    if ($event.target.nextSibling.value > 1) {
      $event.target.nextSibling.value =
        Number($event.target.nextSibling.value) - 1;
      this.update($event, "minus");
    }
  }

  update($event: any, type: string) {
    var valueClassName: string = $event.target.parentNode.parentNode.className;
    var index = +valueClassName.split("item")[1];
    var outCartVM = new OutCartVM();

    if (type == "plus") {
      outCartVM.quantity = Number($event.target.previousSibling.value);
      outCartVM.cartID = this.inCartVM[index].cartID;
      this.unitPrice[index] =
        this.inCartVM[index].price * $event.target.previousSibling.value;
    }
    if (type == "minus") {
      outCartVM.quantity = Number($event.target.nextSibling.value);
      outCartVM.cartID = this.inCartVM[index].cartID;
      this.unitPrice[index] =
        this.inCartVM[index].price * $event.target.nextSibling.value;
    }

    this.cartService.updateQuantity(outCartVM).subscribe((data) => {
      this.getCartData();
    });
  }
  deleteCart($event) {
    var valueClassName: string = $event.target.parentNode.className;
    var index = +valueClassName.split("item")[1];

    var outCartVM = new OutCartVM();
    outCartVM.cartID = this.inCartVM[index].cartID;
    this.cartService.deleteCart(outCartVM).subscribe((data) => {
      this.getCartData();
    });
  }
  changeOption(value: boolean) {
    this.toStore = value;
  }
  toggleDiv() {
    this.animationState = this.animationState === "out" ? "in" : "out";
  }
}
