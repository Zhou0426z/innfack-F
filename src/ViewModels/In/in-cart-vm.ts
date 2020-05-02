import { Guid } from 'guid-typescript';

export class InCartVM {
  public cartID :Guid
  public imageUrl: string;
  public productName: string;
  public price: number;
  public quantity: number;
}
