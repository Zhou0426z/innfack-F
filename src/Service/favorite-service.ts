import { HttpClient, HttpHeaders } from "@angular/common/http";
import { OutFavoriteVM } from "src/ViewModels/Out/out-favorite-vm";
import { HttpEnum } from "src/Enum/http-enum";
import { Injectable } from "@angular/core";
import { Guid } from "guid-typescript";
import { InFavoriteVM } from "src/ViewModels/In/in-favorite-vm";

@Injectable()
export class FavoriteService {
  constructor(private http: HttpClient) {}
  tokenHeader = new HttpHeaders({
    Authorization: "Bearer " + localStorage.getItem("token"),
  });

  addFavorite(outFavoriteVM: OutFavoriteVM) {
    return this.http.post<OutFavoriteVM>(
      HttpEnum.port + "Favorite/AddFavorite",
      outFavoriteVM,
      { headers: this.tokenHeader }
    );
  }
  getFavorite(accountID: Guid) {
    return this.http.get<InFavoriteVM[]>(
      HttpEnum.port + `Favorite/GetFavorite?accountID=${accountID}`,
      { headers: this.tokenHeader }
    );
  }
  deleteFavorite(favoriteID: Guid) {
    return this.http.delete<any>(
      HttpEnum.port + `Favorite/DeleteFavorite?favoriteID=${favoriteID}`,
      { headers: this.tokenHeader }
    );
  }
}
