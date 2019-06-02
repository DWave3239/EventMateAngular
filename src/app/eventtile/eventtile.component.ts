import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-eventtile',
  templateUrl: './eventtile.component.html',
  styleUrls: ['./eventtile.component.css']
})
export class EventtileComponent implements OnInit {

  time:number;
  longitude:number;
  latitude:number;
  
  description:string;
  asset:string;
  title:string;
  timeString:string;
  location:string;

  constructor(private locationService: LocationService) {
    this.description = "Seid ihr bereit eure Gehirne zu überladen und euch bei einem Musikerlebnis der ganz heftigen Art teilzunehmen? Dann bist du hier genau richtig und wirst jede Menge Anschluss und eine neue Lieblingsband kennenlernen. Sei dabei!";
    this.location = "Linz, AT";
    this.asset = "nomaam.png";
    this.title = "Earthsplitter Teaser Party";
    this.time = 1554116400;
    this.timeString = this.dateToString(new Date(this.time*1000));
  }

  ngOnInit() {
    this.locationService.getLocation();
  }


  private dateToString(date:Date):string {
    var days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
    return days[date.getUTCDay()] + ", " + this.zeroFill(date.getUTCDate(), 2) + "." + this.zeroFill(date.getUTCMonth(), 2) + "." + date.getUTCFullYear() + " " + this.zeroFill(date.getHours(), 2) + ":" + this.zeroFill(date.getMinutes(), 2);
  }

  private zeroFill(number, width):string {
    width -= number.toString().length;
    if (width > 0){
      return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + ""; // always return a string
  }
}
