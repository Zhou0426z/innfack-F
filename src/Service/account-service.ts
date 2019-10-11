import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpEnum } from "src/Enum/http-enum";
import { OutAccountVM } from "src/ViewModels/Out/out-account-vm";

@Injectable()
export class AccountService {
  constructor(private http: HttpClient) {}

  signUp(outAccount: OutAccountVM) {
    return this.http.post<any>(HttpEnum.port + "Account/SignUp", outAccount);
  }
  login(outAccount: OutAccountVM) {
    return this.http.post<any>(HttpEnum.port + "Account/Login", outAccount);
  }
}
