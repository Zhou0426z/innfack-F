import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpEnum } from "src/Enum/http-enum";
import { OutAccountVM } from "src/ViewModels/Out/out-account-vm";
import { Router } from "@angular/router";
import { InAccountVM } from "src/ViewModels/In/in-account-vm";
import { OutPasswordVM } from "src/ViewModels/Out/out-password-vm";

@Injectable()
export class AccountService {
  constructor(private http: HttpClient, private router: Router) {}

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
      localStorage.setItem("isLogin", "true");
      this.router.navigate(["index"]);
    }
  }
  updatePassword(outPassword: OutPasswordVM) {
    return this.http.post<any>(
      HttpEnum.port + "Account/UpdatePassword",
      outPassword
    );
  }
  getAccount(accountID: OutAccountVM) {
    return this.http.get<InAccountVM>(
      HttpEnum.port + `Account/GetAccount?accountID=${accountID}`
    );
  }
  updateAccount(outAccount: OutAccountVM) {
    return this.http.post<any>(
      HttpEnum.port + "Account/UpadateAccount",
      outAccount
    );
  }
}
