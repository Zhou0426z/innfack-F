import { Guid } from "guid-typescript";

export class OutPasswordVM {
  public accountID: Guid;
  public oldPassword: string;
  public newPassword: string;
}
