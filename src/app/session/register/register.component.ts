import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import { UserService } from "../../services";

@Component({
  selector: "app-register-page",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterPageComponent implements OnInit {
  public userData = {
    firstName: "",
    lastName: "",
    teamName: "",
    email: "",
    password: "",
  };
  public alertClass: string = "";
  public alertMessage: string = "";
  public loading = false;
  constructor(private UserService: UserService) {}

  ngOnInit() {}

  onSubmit() {
    this.loading = true;
    console.log(this.userData);
    Object.keys(this.userData).some((key) => {
      if (!this.userData[key]) {
        this.showAlert("alert alert-danger", "Missing required fields, please fill all fields!", 4000);
        this.loading = false;
      }
    });

    if (this.loading) {
      this.UserService.register(this.userData)
        .pipe(first())
        .subscribe(
          (data) => {
            this.showAlert("alert alert-success", "We are processing your team, we should respond in 5 businesses days.", 100000);
          },
          (err) => {
            const message = err.error.message || "Something went wrong, please try again..!";
            this.showAlert("alert alert-danger", message, 4000);
            this.loading = false;
          }
        );
    }
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
