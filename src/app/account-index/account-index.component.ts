import { Component, OnInit } from "@angular/core";
import { Guid } from "guid-typescript";
import { AccountService } from "src/Service/account-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-account-index",
  templateUrl: "./account-index.component.html",
  styleUrls: ["./account-index.component.css"],
})
export class AccountIndexComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router) {}
  name: string;

  ngOnInit() {
    var accountID = Guid.parse(localStorage.getItem("id")).toJSON().value;
    this.accountService
      .getAccount(accountID)
      .subscribe((data) => (this.name = data.name));
  }
  signOut() {
    localStorage.clear();
    this.router.navigate(["index"]);
  }
}
