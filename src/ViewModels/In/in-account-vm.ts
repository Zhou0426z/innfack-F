import { Guid } from "guid-typescript";

export class InAccountVM {
  public statusCode: number;
  public accountID: Guid;
  public email: string;
  public name: string;
}
