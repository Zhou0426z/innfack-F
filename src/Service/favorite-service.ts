import { HttpClient } from "@angular/common/http";
import { OutFavoriteVM } from "src/ViewModels/Out/out-favorite-vm";
import { HttpEnum } from "src/Enum/http-enum";
import { Injectable } from "@angular/core";
import { Guid } from "guid-typescript";
import { InFavoriteVM } from "src/ViewModels/In/in-favorite-vm";

@Injectable()
export class FavoriteService {
  constructor(private http: HttpClient) {}
  addFavorite(outFavoriteVM: OutFavoriteVM) {
    return this.http.post<OutFavoriteVM>(
      HttpEnum.port + "Favorite/AddFavorite",
      outFavoriteVM
    );
  }
  getFavorite(accountID: Guid) {
    return this.http.get<InFavoriteVM[]>(
      HttpEnum.port + `Favorite/GetFavorite?accountID=${accountID}`
    );
  }
  deleteFavorite(favoriteID: Guid) {
    return this.http.delete<any>(
      HttpEnum.port + `Favorite/DeleteFavorite?favoriteID=${favoriteID}`
    );
  }
}
