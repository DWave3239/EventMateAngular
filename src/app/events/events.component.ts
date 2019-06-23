import { EMEvent } from './../models/emevent.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: EMEvent[] = [];

  constructor(private _dataService: DataService) {
    this.loadData();
  }

  ngOnInit() {}

  loadData(): void{
    this.events = [];
    this._dataService.getEvent().subscribe((events: EMEvent[]) => {
      this.events = events;
    }, error => {
      console.log(`%cERROR: ${error.message}`, `color: red`);
    });
  }

  dateToString(date: Date): string {
    if(!date) date = new Date();
    var days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
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
