import { HttpClient, HttpHeaders } from "@angular/common/http";
import { OutOrderVM } from "src/ViewModels/Out/out-order-vm";
import { HttpEnum } from "src/Enum/http-enum";
import { Injectable } from "@angular/core";
import { Guid } from "guid-typescript";
import { InOrderVM } from "src/ViewModels/In/in-order-vm";

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {}
  tokenHeader = new HttpHeaders({
    Authorization: "Bearer " + localStorage.getItem("token"),
  });

  addOrder(outOrderVM: OutOrderVM) {
    return this.http.post<any>(HttpEnum.port + "Order/AddOrder", outOrderVM, {
      headers: this.tokenHeader,
    });
  }
  getOrder(accountID: Guid) {
    return this.http.get<InOrderVM[]>(
      HttpEnum.port + `Order/GetOrders?accountID=${accountID}`,
      { headers: this.tokenHeader }
    );
  }
}
