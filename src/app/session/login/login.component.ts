import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";

import { AlertService, AuthenticationService } from "../../services";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  useremail: string;
  password: string;
  alertClass: string = "";
  alertMessage: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService, private alertService: AlertService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/condensed"]);
    }
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "home";
  }

  onSubmit() {
    if (!this.useremail || !this.password) {
      this.showAlert("alert alert-danger", "Missing useremail or password, please try again!", 4000);
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.useremail, this.password)
      .pipe(first())
      .subscribe(
        (data) => {
          this.showAlert("alert alert-success", "Login Successful, please wait...!", 2000);
          setTimeout(() => this.router.navigate([this.returnUrl]), 2000);
        },
        (error) => {
          this.alertService.error(error);
          this.showAlert("alert alert-danger", "Invalid useremail or password, please try again!", 4000);
          this.loading = false;
        }
      );
  }

  /**
   * Show Alert
   * @param alertClass
   * @param alertMessage
   * @param alertTimeout
   */
  showAlert(alertClass, alertMessage, alertTimeout) {
    this.alertClass = alertClass;
    this.alertMessage = alertMessage;
    setTimeout(() => {
      this.alertClass = "";
      this.alertMessage = "";
    }, alertTimeout);
  }
}
