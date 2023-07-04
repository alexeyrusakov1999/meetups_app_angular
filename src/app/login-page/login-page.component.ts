import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IUser } from "../shared/interfaces";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  isRequestSend: boolean = false;
  constructor(public authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authService.checkLogin();
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.isRequestSend = true;

    const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.authService
      .login(this.form.value.email, this.form.value.password)
      .subscribe(
        () => {
          this.form.reset();
          // this.router.navigate(["/meetups"]);
          this.isRequestSend = false;
        },
        () => {
          this.isRequestSend = false;
        }
      );
  }
}
