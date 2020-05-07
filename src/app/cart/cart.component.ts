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
import { Taiwan } from "src/assets/Taiwan";
import { OutOrderVM } from "src/ViewModels/Out/out-order-vm";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { OrderService } from "src/Service/order-service";
import { Router } from '@angular/router';

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit, AfterViewInit {
  constructor(
    private cartService: CartService,
    private renderer: Renderer2,
    private orderService: OrderService,
    private router :Router
  ) {}
  private inCartVM: InCartVM[] = [];
  private price: number = 0;
  private freight: number = 60;
  private totalPrice: number;
  private totalCount: number = 0;
  private unitPrice: number[] = [];
  private toStore = true;
  private payFirst = true;
  private deliveryOpt = "711payfirst";
  private payOpt = "unionCard";
  private invoiceOpt = "self";
  private taiwanData = [];
  private areaList = [];
  private cartForm = new FormGroup({
    address: new FormControl(),
    city: new FormControl(),
    area: new FormControl(),
    remark: new FormControl(),
    customerName: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    isRuleOneChecked: new FormControl(true, Validators.required),
    isRuleTwoChecked: new FormControl(true, Validators.required),
    isRuleThreeChecked: new FormControl(true, Validators.required),
  });
  ngOnInit(): void {
    if (localStorage.getItem("isLogin") == null) {
      this.inCartVM = [];
      this.router.navigate(["/login"]);
      return;
    }
    this.taiwanData = Taiwan.data;
    this.areaList = this.taiwanData[0].AreaList;

    this.getCartData();

  }
  ngAfterViewInit() {
    this.getCartData();
  }

   getCartData() {
    var accountID = Guid.parse(localStorage.getItem("id"));
     this.cartService
      .getCart(accountID)
      .subscribe((data) => {
        this.inCartVM = data;
        console.log(data);
        this.totalCount = data.length;
      });
    this.price = 0;
    for (var i = 0; i < this.inCartVM.length; i++) {
      this.price += this.inCartVM[i].price * this.inCartVM[i].quantity;
      this.unitPrice[i] = this.inCartVM[i].price * this.inCartVM[i].quantity;
    }
    this.totalPrice = this.price + this.freight;
  }

  quantityPlus($event: any) {
    $event.target.previousSibling.value =
      Number($event.target.previousSibling.value) + 1;

    this.update($event, "plus");
  }
  quantityMinus($event: any) {
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
  changeToWhereOption(value: boolean) {
    this.toStore = value;
  }
  changeDeliveryOption(value: string) {
    this.deliveryOpt = value;
    if (value == "711storePay" || value == "famstorePay") {
      this.payFirst = false;
    } else {
      this.payFirst = true;
    }
  }
  changePayOption(value: string) {
    this.payOpt = value;
  }
  changeInvoiceOption(value: string) {
    this.invoiceOpt = value;
  }
  getAreaName($event: any) {
    var valueArea = this.taiwanData.filter(
      (data) => data.CityName == $event.target.value
    );
    this.areaList = valueArea[0].AreaList;
  }
  addOrder() {
    var outOrderVM = new OutOrderVM();
    var shipCity = this.cartForm.get("city").value;
    var shipvia = "homeDelivery";
    var shipAddress =
      this.cartForm.get("city").value +
      this.cartForm.get("area").value +
      this.cartForm.get("address").value;
    if (
      (this.cartForm.get("city").value == null ||
        this.cartForm.get("area").value == null ||
        this.cartForm.get("address").value == null) &&
      this.toStore == false
    ) {
      alert("請填寫完整地址");
      return;
    }
    if (this.toStore == true) {
      shipvia = "store";
      shipAddress = "超商地址";
      shipCity = "超商城市";
    }

    outOrderVM.accountId = Guid.parse(
      localStorage.getItem("id")
    ).toJSON().value;
    outOrderVM.shipVia = shipvia;
    outOrderVM.freight = this.freight;
    outOrderVM.shipCity = shipCity;
    outOrderVM.shipAddress = shipAddress;
    outOrderVM.payWay = this.payOpt;
    outOrderVM.hasPay = "0";
    outOrderVM.customerName = this.cartForm.get("customerName").value;
    outOrderVM.phone = this.cartForm.get("phone").value;
    outOrderVM.remark = this.cartForm.get("remark").value;
    outOrderVM.invoiceWay = this.invoiceOpt;

    this.orderService.addOrder(outOrderVM).subscribe();
  }
}
