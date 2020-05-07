import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Guid } from "guid-typescript";
import { InCartVM } from "src/ViewModels/In/in-cart-vm";
import { HttpEnum } from "src/Enum/http-enum";
import { OutCartVM } from "src/ViewModels/Out/out-cart-vm";

@Injectable()
export class CartService {
  constructor(private http: HttpClient) {}

  getCart(accountID: Guid) {
    return this.http.get<InCartVM[]>(
      HttpEnum.port + `Cart/GetCarts?accountID=${accountID}`,
      
    );
  }
  updateQuantity(outCartVM: OutCartVM) {
    return this.http.post<any>(
      HttpEnum.port + "Cart/UpdateQuantity",
      outCartVM
    );
  }
  deleteCart(outCartVM: OutCartVM) {
    return this.http.post<any>(
      HttpEnum.port + "Cart/DeleteCart",
      outCartVM
    );
  }
  addCart(outCartVM :OutCartVM){
    return this.http.post<any>(
      HttpEnum.port + "Cart/AddCart",
      outCartVM
    );
  }
}
