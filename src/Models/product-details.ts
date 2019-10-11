import { Guid } from "guid-typescript";

export class ProductDetails {
  productDetailId: Guid;
  productDetailName: string;
  productId: Guid;
  specification: string;
  stock: number;
}
