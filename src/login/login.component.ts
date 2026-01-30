import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { APIServices } from '../services/api.services';
import { NotificationComponent } from "../notification/notification.component";
import { Router } from '@angular/router';
import { exhaustMap, Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NotificationComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  notificationType = '';
  notificationMessage = '';
  notificationVisibility = false;
  loginClick$ = new Subject<any>();

  constructor(
    private service: APIServices,
    private router: Router
  ) { }
  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    //Clear localStorage when user landing on login page
    localStorage.clear();

    this.loginClick$.pipe(
      exhaustMap((payload) => this.service.login(payload))
    ).subscribe((res: any) => {
      this.signInForm.reset();
      localStorage.setItem("token", res?.accessToken)
      this.router.navigate(['/dashboard']);
    }, (error: any) => {
      this.setNotificationDetails(JSON.stringify(error?.error), 'error', true);
    });
  }

  signIn() {
    if (this.signInForm.invalid) {
      //To display error message on click of the button
      this.signInForm.markAllAsTouched();
    } else {

      //Valid form
      const payload: any = {
        "email": this.signInForm.controls['email']?.value,
        "password": this.signInForm.controls['password']?.value
      };
      this.loginClick$.next(payload);
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
