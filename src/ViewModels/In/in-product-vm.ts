import { Guid } from "guid-typescript";

export class InProductVM {
  public productID: Guid;
  public imageSilders: string[];
  public productName: string;
  public description: string;
  public brand: string;
  public price: number;
  public stock: number;
  public productNo: string;
}
