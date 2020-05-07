import { Guid } from "guid-typescript";

export class OrderDetails {
  public productId: Guid;
  public unitPrice: number;
  public quantity: number;
  public productName :string
}
