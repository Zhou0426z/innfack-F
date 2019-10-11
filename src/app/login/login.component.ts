import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { OutAccountVM } from 'src/ViewModels/Out/out-account-vm';
import { AccountService } from 'src/Service/account-service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private accountService:AccountService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null,Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {}
  loginForm: FormGroup;
  outAccountVM :OutAccountVM;

  normalLogin(value){
    this.outAccountVM = new OutAccountVM();
    this.outAccountVM.email = value.email;
    this.outAccountVM.password = value.password;
    this.outAccountVM.loginBy = "normal";
    this.accountService.login(this.outAccountVM).subscribe(data=>{
      this.setLocalStorage(data);
      console.log(sessionStorage.getItem('name'));
    });
  }
  setLocalStorage(data){
    sessionStorage.setItem('id',data.accountID);
    sessionStorage.setItem('name',data.name);
    sessionStorage.setItem('email',data.email);
  }
}
