import { Component } from '@angular/core';
import { FilterComponent } from './filter/filter.component';
import { ViewChild } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('filter') filter: FilterComponent;

  title = 'EventMateAngular';
  city = ' your location';

  loggedIn = true;

  user = {
    name: "User"
  }

  hide: boolean;

  constructor(private router: Router) {
    this.hide = true;
  }

  login(){
    this.loggedIn = true;
  }

  logout(){
    this.loggedIn = false;
  }

  toggleFilter() {
    this.filter.toggle();
  }

  gotoHome(){
    this.router.navigate(['/']);
  }
}
