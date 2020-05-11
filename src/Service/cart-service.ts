import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Guid } from "guid-typescript";
import { InCartVM } from "src/ViewModels/In/in-cart-vm";
import { HttpEnum } from "src/Enum/http-enum";
import { OutCartVM } from "src/ViewModels/Out/out-cart-vm";

@Injectable({
  providedIn: "root",
})
export class CartService {
  constructor(private http: HttpClient) {}
  tokenHeader = new HttpHeaders({
    Authorization: "Bearer " + localStorage.getItem("token"),
  });

  getCart(accountID: Guid) {
    return this.http.get<InCartVM[]>(
      HttpEnum.port + `Cart/GetCarts?accountID=${accountID}`,
      { headers: this.tokenHeader }
    );
  }
  updateQuantity(outCartVM: OutCartVM) {
    return this.http.post<any>(
      HttpEnum.port + "Cart/UpdateQuantity",
      outCartVM,
      { headers: this.tokenHeader }
    );
  }
  deleteCart(outCartVM: OutCartVM) {
    return this.http.post<any>(HttpEnum.port + "Cart/DeleteCart", outCartVM, {
      headers: this.tokenHeader,
    });
  }
  addCart(outCartVM: OutCartVM) {
    return this.http.post<any>(HttpEnum.port + "Cart/AddCart", outCartVM, {
      headers: this.tokenHeader,
    });
  }
}
