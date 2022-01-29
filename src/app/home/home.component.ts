import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {  AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  firstName: string;
  lastName: string;
  updateBtnDisable: boolean;
  user: User;
  nepaliRupees: number;
  usDollar: number;

  constructor(private userService: UserService, private authenticationService: AuthenticationService) { 
  
  }

  ngOnInit(): void {
    console.log(this.authenticationService.currentUserValue);
    this.firstName = this.authenticationService.currentUserValue.firstName;
    this.lastName = this.authenticationService.currentUserValue.lastName;
    if (this.firstName && this.lastName) {
      this.updateBtnDisable = false;
    }
    // console.log(this.user);
  }

  inputKeyUp(scenario) {
    if (scenario == 'name') {
      if (this.firstName && this.lastName) {
        this.updateBtnDisable = false;
      } else {
        this.updateBtnDisable = true;
      }
    }
    if (scenario == 'currency') {
      console.log('here i am');
      this.usDollar = this.nepaliRupees/120;
      console.log(this.nepaliRupees);
    }

  }

  updateName() {
    this.authenticationService.currentUserValue.firstName = this.firstName;
    this.authenticationService.currentUserValue.lastName = this.lastName;
    this.user = this.authenticationService.currentUserValue;
    localStorage.setItem('currentUser', JSON.stringify(this.user));
    this.userService.update(this.user)
    .pipe(first())
    .subscribe(
        data => {

        },
        error => {
          console.log('error', error);
          //   this.alertService.error(error);
          //   this.loading = false;
        });

  }

}
