import { Guid } from "guid-typescript";

export class OutAccountVM {
  public password: string;
  public userName: string;
  public email: string;
  public birthday?: Date;
  public loginBy: string;
  public accountID?: Guid;
  public phone?: string;
  public gender?: string;
  public subscribe? :string;
}
