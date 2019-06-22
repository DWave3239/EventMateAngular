import { Component } from '@angular/core';
import { FilterComponent } from './filter/filter.component';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('filter') filter: FilterComponent;

  title = 'EventMateAngular';
  city = ' your location';


  toggleFilter() {
    this.filter.toggle();
  }
}
