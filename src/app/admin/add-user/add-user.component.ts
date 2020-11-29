import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../../services';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  public userData = {
    firstName: '',
    lastName: '',
    email: '',
    userRole: '',
    status: '',
  };
  public alertClass: string = '';
  public alertMessage: string = '';
  public loading = false;

  constructor(private UserService: UserService) {}
  ngOnInit() {}

  onSubmit() {
    this.loading = true;
    Object.keys(this.userData).some((key) => {
      if (!this.userData[key]) {
        this.showAlert(
          'alert alert-danger',
          'Missing required fields, please fill all fields!',
          4000
        );
        this.loading = false;
      }
    });
    if (this.loading) {
      this.UserService.createUser(this.userData)
        .pipe(first())
        .subscribe(
          (data) => {
            this.showAlert(
              'alert alert-success',
              'User created, user details sent on relevant email along with a password',
              6000
            );
            this.loading = false;
            Object.keys(this.userData).forEach(
              (key) => (this.userData[key] = '')
            );
          },
          (err) => {
            console.log(err);
            const message =
              err.error.message || 'Something went wrong, please try again..!';
            this.showAlert('alert alert-danger', message, 4000);
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
      this.alertClass = '';
      this.alertMessage = '';
    }, alertTimeout);
  }
}
