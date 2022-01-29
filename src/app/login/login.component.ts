import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {  AuthenticationService } from '../services/authentication.service';
import {  AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
//   loading = false;
  submitted = false;
  returnUrl: string;
  exceptionMsg: string;
  isException: boolean;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;
      this.isException = false;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
    //   this.loading = true;
      this.authenticationService.login(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
                  // console.log('this.returnUrl', this.returnUrl);
                  // this.router.navigate([this.returnUrl]);
                  this.router.navigate(['/']);
              },
              error => {
                  this.isException = true;
                  this.exceptionMsg = error.error.message;
                  console.log('error', error.error.message);

                //   this.alertService.error(error);
                //   this.loading = false;
              });
  }

  inputKeyUp() {
    this.isException = false;
    this.exceptionMsg = "";
  }
}
