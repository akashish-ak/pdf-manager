import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { APIServices } from '../services/api.services';
import { NotificationComponent } from "../notification/notification.component";

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NotificationComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  notificationType = '';
  notificationMessage = '';
  notificationVisibility = false;

  constructor(private service: APIServices) { }

  signUpForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    passwordConfirmation: new FormControl('', Validators.required),
  });

  createAnAccount() {
    if (this.signUpForm.invalid || (this.signUpForm.controls['password']?.value !== this.signUpForm.controls['passwordConfirmation']?.value)) {
      //To display error message on click of the button
      this.signUpForm.markAllAsTouched();
    } else {
      //Valid form
      const payload = {
        "email": this.signUpForm.controls['email']?.value,
        "password": this.signUpForm.controls['password']?.value,
        "passwordConfirmation": this.signUpForm.controls['passwordConfirmation']?.value,
        "firstName": this.signUpForm.controls['firstName']?.value,
        "lastName": this.signUpForm.controls['lastName']?.value
      };
      this.service.createNewAccount(payload).subscribe((res: any) => {
        this.signUpForm.reset();
        this.setNotificationDetails('Your account has been created successfully!', 'success', true);
      }, (error: any) => {
        this.setNotificationDetails(JSON.stringify(error?.error), 'error', true);
      });
    }
  }

  setNotificationDetails(msg: string, type: string, visible: boolean) {
    this.notificationMessage = msg;
    this.notificationType = type;
    this.notificationVisibility = visible;
    setTimeout(() => {
      this.notificationVisibility = false;
    }, 3000);
  }

}
