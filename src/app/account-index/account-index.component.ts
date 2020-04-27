import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-account-index",
  templateUrl: "./account-index.component.html",
  styleUrls: ["./account-index.component.css"],
})
export class AccountIndexComponent implements OnInit {
  constructor() {}
  name: string;

  ngOnInit() {
    this.name = localStorage.getItem("name");
  }
}
