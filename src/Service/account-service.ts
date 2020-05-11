import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpEnum } from "src/Enum/http-enum";
import { OutAccountVM } from "src/ViewModels/Out/out-account-vm";
import { Router } from "@angular/router";
import { InAccountVM } from "src/ViewModels/In/in-account-vm";
import { OutPasswordVM } from "src/ViewModels/Out/out-password-vm";

@Injectable()
export class AccountService {
  constructor(private http: HttpClient, private router: Router) {}
  tokenHeader = new HttpHeaders({
    Authorization: "Bearer " + localStorage.getItem("token"),
  });
  signUp(outAccount: OutAccountVM) {
    return this.http.post<InAccountVM>(
      HttpEnum.port + "Account/SignUp",
      outAccount
    );
  }
  login(outAccount: OutAccountVM) {
    return this.http.post<InAccountVM>(
      HttpEnum.port + "Account/Login",
      outAccount
    );
  }
  setSessionStorage(data: InAccountVM) {
    if (data.statusCode == 200) {
      localStorage.setItem("id", data.accountID.toString());
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);
      localStorage.setItem("token", data.token);
      localStorage.setItem("isLogin", "true");
      this.router.navigate(["index"]);
    }
  }
  updatePassword(outPassword: OutPasswordVM) {
    return this.http.post<any>(
      HttpEnum.port + "Account/UpdatePassword",
      outPassword,
      { headers: this.tokenHeader }
    );
  }
  getAccount(accountID: OutAccountVM) {
    return this.http.get<InAccountVM>(
      HttpEnum.port + `Account/GetAccount?accountID=${accountID}`,
      { headers: this.tokenHeader }
    );
  }
  updateAccount(outAccount: OutAccountVM) {
    return this.http.post<any>(
      HttpEnum.port + "Account/UpadateAccount",
      outAccount,
      { headers: this.tokenHeader }
    );
  }
}
