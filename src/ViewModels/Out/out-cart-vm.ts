import { Guid } from "guid-typescript";

export class OutCartVM {
  public cartID: Guid;
  public productID :Guid;
  public accountID :Guid;
  public quantity: number;
}
