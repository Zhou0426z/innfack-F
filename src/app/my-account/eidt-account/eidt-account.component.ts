import { Component, OnInit } from "@angular/core";
import { AccountService } from "src/Service/account-service";
import { Guid } from "guid-typescript";
import { FormGroup, FormControl } from "@angular/forms";
import { InAccountVM } from "src/ViewModels/In/in-account-vm";
import { OutAccountVM } from "src/ViewModels/Out/out-account-vm";
import { DatePipe } from '@angular/common';

@Component({
  selector: "app-eidt-account",
  templateUrl: "./eidt-account.component.html",
  styleUrls: ["./eidt-account.component.css"],
})
export class EidtAccountComponent implements OnInit {
  constructor(private accountService: AccountService, private datePipe: DatePipe) {}

  accountForm = new FormGroup({
    name: new FormControl(),
    phone: new FormControl(),
    email: new FormControl({ value: null, disabled: true }),
    birthDate: new FormControl(),
  });
  gender = null;
  subscribe = null;

  ngOnInit() {
    var accountID = Guid.parse(localStorage.getItem("id")).toJSON().value;
    this.accountService.getAccount(accountID).subscribe((data) => {
      this.accountForm.get("name").setValue(data.name);
      this.accountForm.get("phone").setValue(data.phone);
      this.accountForm.get("email").setValue(data.email);
      this.accountForm.get("birthDate").setValue(this.datePipe.transform(data.birthDay, "yyyy-MM-dd"));
      this.gender = data.gender;
      this.subscribe = data.subscribe;
    });
  }

  changGenderOpt(value: string) {
    this.gender = value;
  }
  changSubscribeOpt(value: string) {
    this.subscribe = value;
  }
  updateAccount() {
    var accountID = Guid.parse(localStorage.getItem("id")).toJSON().value;
    var outAccountVM = new OutAccountVM();
    outAccountVM.accountID = accountID;
    outAccountVM.userName = this.accountForm.get("name").value;
    outAccountVM.phone = this.accountForm.get("phone").value;
    outAccountVM.birthday = this.accountForm.get("birthDate").value;
    outAccountVM.gender = this.gender;
    outAccountVM.subscribe = this.subscribe;

    this.accountService.updateAccount(outAccountVM).subscribe(data=>alert("修改成功"));
  }
}
