import { Component, OnInit } from "@angular/core";
import { FavoriteService } from "src/Service/favorite-service";
import { Guid } from "guid-typescript";
import { InFavoriteVM } from "src/ViewModels/In/in-favorite-vm";
import { CartService } from "src/Service/cart-service";
import { OutCartVM } from 'src/ViewModels/Out/out-cart-vm';

@Component({
  selector: "app-favorite-list",
  templateUrl: "./favorite-list.component.html",
  styleUrls: ["./favorite-list.component.css"],
})
export class FavoriteListComponent implements OnInit {
  constructor(
    private favoriteService: FavoriteService,
    private cartService: CartService
  ) {}

  private favoriteList: InFavoriteVM[] = [];
  ngOnInit() {
    this.getFavorite();
  }
  async getFavorite() {
    var accountID = Guid.parse(localStorage.getItem("id"));
    await this.favoriteService
      .getFavorite(accountID)
      .subscribe((data) => (this.favoriteList = data));
  }
  deleteFavorite(favoriteID: Guid) {
    this.favoriteService.deleteFavorite(favoriteID).subscribe((data) => {
      this.getFavorite();
    });
  }
  addCart(productID:Guid){
    var accountID = Guid.parse(localStorage.getItem("id")).toJSON().value;
    var outCartVM = new OutCartVM();
    outCartVM.accountID = accountID;
    outCartVM.productID = productID;
    outCartVM.quantity = 1;
    this.cartService.addCart(outCartVM).subscribe();
    alert("已加入購物車");
  }
}
