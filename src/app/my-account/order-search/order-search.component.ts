import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/Service/order-service";
import { Guid } from "guid-typescript";
import { InOrderVM } from "src/ViewModels/In/in-order-vm";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-order-search",
  templateUrl: "./order-search.component.html",
  styleUrls: ["./order-search.component.css"],
})
export class OrderSearchComponent implements OnInit {
  constructor(private orderService: OrderService, private datePipe: DatePipe) {}
  private orders: InOrderVM[] = [];
  ngOnInit() {
    this.getData();
  }

  async getData() {
    var accountID = Guid.parse(localStorage.getItem("id"));
    await this.orderService.getOrder(accountID).subscribe((data) => {
      this.orders = data;
      this.orders.map((x) => (x.hasPay = this.replaceHasPay(x.hasPay.toString() == 'false')));
      this.orders.map(
        (x) =>
          (x.orderDate = this.datePipe.transform(x.orderDate, "yyyy/MM/dd"))
      );
    });
  }

  replaceHasPay(hasPay: boolean) {
    if (hasPay) {
      return "尚未付款";
    } else {
      return "已付款";
    }
  }
}
