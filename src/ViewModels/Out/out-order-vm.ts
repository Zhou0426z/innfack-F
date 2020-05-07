import { Guid } from "guid-typescript";

export class OutOrderVM {
  public accountId: Guid;
  public shipVia: string;
  public freight: number;
  public shipCity: string;
  public shipAddress: string;
  public payWay: string;
  public hasPay: string;
  public customerName: string;
  public phone: string;
  public invoiceWay: string;
  public remark: string;
}
