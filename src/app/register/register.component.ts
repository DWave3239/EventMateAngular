import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MatSnackBar } from '@angular/material';
import { EMUser } from '../models/emuser.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username:string;
  password: string;
  password2: string;
  firstName: string;
  lastName: string;

  constructor(public router: Router, private _dataService: DataService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  checkUsername() {
    if(this.username === undefined || this.username.length <= 3){
      this.openSnackBar("Username must be at least 4 characters.");
    }else{
      this._dataService.checkForUser(this.username).subscribe(user => {
        if(user[0]){
          this.openSnackBar("This username is already used. Please choose a new one.")
        }
      }, error => {
        this.openSnackBar("There appears to be a problem. Please try again later.");
      });
    }
  }

  checkPassword(): boolean {
    var message = "";
    if(!this.password){
      message += 'Password must not be empty.';
    }else{
      if(this.password.length < 6){
        message += 'Password is too short.';
      }
    }
    if(message !== ""){
      this.openSnackBar(message);
      return false;
    }
    return true;
  }

  checkPasswords(message: boolean = true){
    if(this.password === this.password2){
      if(message) this.openSnackBar('Passwords match');
      return true;
    }else{
      this.openSnackBar('Passwords do not match!');
      return false;
    }
  }

  checkData():boolean{
    return this.firstName !== "" && this.lastName !== "" && this.checkPassword() && this.checkPasswords(false);
  }

  register() {
    this._dataService.checkForUser(this.username).subscribe(user => {
      if(user[0]){
        this.openSnackBar("This username is already used. Please choose a new one.")
      }else{
        if(this.checkData()){
          const user: EMUser = {
            "id": null,
            "firstName": this.firstName,
            "lastName": this.lastName,
            "username": this.username,
            "password": this.password
          };

          this._dataService.registerUser(user).subscribe(user => {
            this.router.navigate(['/']);
          });
        }
      }
    }, error => {
      this.openSnackBar("There appears to be a problem. Please try again later.");
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 3000,
    });
  }
}
