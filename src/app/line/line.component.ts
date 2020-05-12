import { Component, OnInit } from "@angular/core";
import { LineService } from "src/Service/line-service";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService } from "src/Service/account-service";

@Component({
  selector: "app-line",
  templateUrl: "./line.component.html",
  styleUrls: ["./line.component.css"],
})
export class LineComponent implements OnInit {
  constructor(
    private lineService: LineService,
    private activateRoute: ActivatedRoute,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activateRoute.queryParams.subscribe((params) => {
      this.lineService.getToken(params["code"]).subscribe((data) => {
        this.accountService.lineSignUp(data.id_token).subscribe((res) => {
          if (res.statusCode == 500) {
            this.accountService.lineLogin(data.id_token).subscribe(lineres=>{
              this.accountService.setSessionStorage(lineres)
            });
            this.router.navigate(["index"]);
          } else {
            this.router.navigate(["login"]);
          }
        });
      });
    });
  }
}
