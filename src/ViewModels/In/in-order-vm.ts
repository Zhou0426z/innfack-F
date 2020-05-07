import { Guid } from "guid-typescript";
import { OrderDetails } from "src/Models/order-details";

export class InOrderVM {
  public orderID: Guid;
  public shipAddress: string;

  public totalPrice: string;

  public orderDate: string;

  public hasPay: string;

  public orderDetails: OrderDetails[];
}
