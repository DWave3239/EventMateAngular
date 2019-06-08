import { Component } from '@angular/core';
import { FilterComponent } from './filter/filter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EventMateAngular';
  city = ' your location';



  toggleFilter() {
    //this.filter.toggle();
    console.log("toggle filter");

  }  
}
