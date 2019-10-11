import { Injectable } from "@angular/core";
import { OutAccountVM } from "src/ViewModels/Out/out-account-vm";
import { AccountService } from "./account-service";
declare const FB: any;

@Injectable()
export class FbService {
  constructor(private accountService: AccountService) {}
  outAccountVM: OutAccountVM;
  fbLoginInit() {
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId: "423453254951279",
        cookie: true,
        xfbml: true,
        version: "v4.0"
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
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
  submitLogin() {
    FB.login(
      response => {
        if (response.authResponse) {
          this.getUser();
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

  getUser() {
    var accountService = this.accountService;
    FB.api("/me", { fields: "email,name" }, function(response) {
      if (response && !response.error) {
        var outAccountVM: OutAccountVM = {
          password: null,
          userName: response.name,
          email: response.email,
          loginBy: "FB"
        };
        accountService.signUp(outAccountVM).subscribe();
      }
    });
  }
}
