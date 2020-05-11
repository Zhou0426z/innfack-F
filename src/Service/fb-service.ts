import { Injectable, NgZone } from "@angular/core";
import { OutAccountVM } from "src/ViewModels/Out/out-account-vm";
import { AccountService } from "./account-service";
import { Router } from "@angular/router";
declare const FB: any;

@Injectable()
export class FbService {
  constructor(
    private accountService: AccountService,
    private zone: NgZone,
    private router: Router
  ) {}
  outAccountVM: OutAccountVM;
  fbLoginInit() {
    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: "423453254951279",
        cookie: true,
        xfbml: true,
        version: "v4.0",
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }
  fbSignUp() {
    var accountService = this.accountService;
    var outAccountVM = this.outAccountVM;
    var router = this.router;
    FB.login(
      (response) => {
        if (response.authResponse) {
          FB.api("/me", { fields: "email,name" }, function (response) {
            if (response && !response.error) {
              outAccountVM = {
                password: null,
                userName: response.name,
                email: response.email,
                loginBy: "FB",
              };
              accountService.signUp(outAccountVM).subscribe((res) => {
                alert("註冊成功");
                router.navigate(['login']);
              });
              
            }
          });
        } else {
          console.log("fail");
        }
      },
      { scope: "email" }
    );
  }

  submitLogout() {
    FB.logout();
  }

  fbLogin() {
    var accountService = this.accountService;
    var outAccountVM = this.outAccountVM;
    var reuslt;
    FB.login((response) =>
      this.zone.run(
        () => {
          if (response.authResponse) {
            FB.api("/me", { fields: "email,name" }, function (response) {
              if (response && !response.error) {
                outAccountVM = {
                  password: null,
                  userName: response.name,
                  email: response.email,
                  loginBy: "FB",
                };
                accountService.login(outAccountVM).subscribe((data) => {
                  accountService.setSessionStorage(data);
                });
              }
            });
          } else {
            console.log("fail");
          }
        },
        { scope: "email" }
      )
    );

    return reuslt;
  }
}
