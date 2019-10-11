import { Guid } from "guid-typescript";
import { ProductDetails } from 'src/Models/product-details';

export class InProductVM {
  public productID: Guid;
  public imageSilders: string[];
  public productName: string;
  public description: string;
  public brand: string;
  public price: number;
  public productDetails : ProductDetails[];
}
