import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { EMEvent } from '../models/emevent.model';
import { EMUser } from '../models/emuser.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-your-events',
  templateUrl: './your-events.component.html',
  styleUrls: ['./your-events.component.css']
})
export class YourEventsComponent implements OnInit {
  user: EMUser;
  events: EMEvent[];
  eventsDone: EMEvent[];

  constructor(private _userService: UserService, private _dataService: DataService, private router: Router) {
    this.user = this._userService.user;
    if(this.user){
      this._dataService.getUserEvents(this.user.id).subscribe((events: EMEvent[]) => {
        this.events = events.filter(e => e.toDate === null || e.toDate >= new Date().getTime());
        this.eventsDone = events.filter(e => e.toDate < new Date().getTime());
        this.events.sort(this.compare);
        this.eventsDone.sort(this.compare);
      }, error => {
        console.log(`%cERROR: ${error.message}`, `color: red`);
      });
    }else{
      this.router.navigate(['/']);
    }
  }

  compare(a:EMEvent, b:EMEvent){
    if(a.fromDate < b.fromDate){
      return -1;
    }
    if(a.fromDate > b.fromDate){
      return 1;
    }
    return 0;
  }

  ngOnInit() {
  }

  dateToString(timestamp: number): string {
    let date;
    if(!timestamp) return "no information";
    else           date = new Date(timestamp);
    //var days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
    var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days[date.getUTCDay()] + ", " + this.zeroFill(date.getUTCDate(), 2) + "." + this.zeroFill(date.getUTCMonth()+1, 2) + "." + date.getUTCFullYear() + " " + this.zeroFill(date.getHours(), 2) + ":" + this.zeroFill(date.getMinutes(), 2);
  }

  private zeroFill(number, width): string {
    width -= number.toString().length;
    if (width > 0) {
      return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return number + ""; // always return a string
  }

}
