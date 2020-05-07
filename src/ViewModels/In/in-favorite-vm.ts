import { Guid } from "guid-typescript";

export class InFavoriteVM {
  public favoriteID: Guid;
  public productID: Guid;
  public productName: string;
  public unitPrice: number;
  public imgUrl: string;
}
