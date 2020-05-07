import { Component, OnInit } from "@angular/core";
import { AccountService } from "src/Service/account-service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { OutPasswordVM } from "src/ViewModels/Out/out-password-vm";
import { Guid } from "guid-typescript";

@Component({
  selector: "app-edit-password",
  templateUrl: "./edit-password.component.html",
  styleUrls: ["./edit-password.component.css"],
})
export class EditPasswordComponent implements OnInit {
  constructor(private accountService: AccountService) {}

  editForm = new FormGroup({
    oldPassword: new FormControl(null, Validators.required),
    newPassword: new FormControl(null, Validators.required),
    newPassword2: new FormControl(null, Validators.required),
  });
  ngOnInit() {}

  updatePassword() {
    var accountID = Guid.parse(localStorage.getItem("id")).toJSON().value;
    if (this.editForm.get("newPassword").value == this.editForm.get("newPassword2").value) {
      var outPassword = new OutPasswordVM();
      outPassword.accountID = accountID;
      outPassword.newPassword = this.editForm.get("newPassword").value;
      outPassword.oldPassword = this.editForm.get('oldPassword').value;
      this.accountService.updatePassword(outPassword).subscribe(data=>{
        if(data == true){
          alert("修改成功");
          this.editForm.reset();
        }else{
          alert("密碼錯誤")
        }
      });
    }else{
      alert("新密碼確認錯誤");
    }
  }
}
