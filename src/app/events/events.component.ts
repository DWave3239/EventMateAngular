import { EMEvent } from './../models/emevent.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: EMEvent[] = [
    {
      id: 0,
      date: new Date(),
      lon: 42.5,
      lat: 18.3,
      desc: "Seid ihr bereit eure Gehirne zu überladen und euch bei einem Musikerlebnis der ganz heftigen Art teilzunehmen? Dann bist du hier genau richtig und wirst jede Menge Anschluss und eine neue Lieblingsband kennenlernen. Sei dabei!",
      asset: "assets/images/nomaam.png",
      title: "Earthsplitter Teaser Party",
      dateString: this.dateToString(new Date()),
      locDesc: "Linz, AT"
    },
    {
      id: 1,
      date: new Date(),
      lon: 42.5,
      lat: 18.3,
      desc: "BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA lzunehmen? Dann bist du hier genau richtig und wirst LOREM IPSUM eine neue Lieblingsband kennenlernen. Sei dabei!",
      asset: "assets/images/nomaam.png",
      title: "Another boring event",
      dateString: this.dateToString(new Date()),
      locDesc: "Freistadt, AT"
    },
    {
      id: 2,
      date: new Date(),
      lon: 42.5,
      lat: 18.3,
      desc: "LOREM FCKING IPSUM blablabla!",
      asset: "assets/images/nomaam.png",
      title: "Ultra nice Party",
      dateString: this.dateToString(new Date()),
      locDesc: "Leonding, AT"
    },
    {
      id: 3,
      date: new Date(),
      lon: 42.5,
      lat: 18.3,
      desc: "Seid ihr bereit eure Gehirne zu überladen und euch bei einem Musikerlebnis der ganz heftigen Art teilzunehmen? Dann bist du hier genau richtig und wirst jede Menge Anschluss und eine neue Lieblingsband kennenlernen. Sei dabei!",
      asset: "assets/images/nomaam.png",
      title: "Earthsplitter Teaser Party",
      dateString: this.dateToString(new Date()),
      locDesc: "Linz, AT"
    },
    {
      id: 4,
      date: new Date(),
      lon: 42.5,
      lat: 18.3,
      desc: "BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA lzunehmen? Dann bist du hier genau richtig und wirst LOREM IPSUM eine neue Lieblingsband kennenlernen. Sei dabei!",
      asset: "assets/images/nomaam.png",
      title: "Another boring event",
      dateString: this.dateToString(new Date()),
      locDesc: "Freistadt, AT"
    },
    {
      id: 5,
      date: new Date(),
      lon: 42.5,
      lat: 18.3,
      desc: "LOREM FCKING IPSUM blablabla!",
      asset: "assets/images/nomaam.png",
      title: "Ultra nice Party",
      dateString: this.dateToString(new Date()),
      locDesc: "Leonding, AT"
    }
  ]

  constructor() {

  }

  ngOnInit() {

  }


  private dateToString(date: Date): string {
    var days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
    return days[date.getUTCDay()] + ", " + this.zeroFill(date.getUTCDate(), 2) + "." + this.zeroFill(date.getUTCMonth(), 2) + "." + date.getUTCFullYear() + " " + this.zeroFill(date.getHours(), 2) + ":" + this.zeroFill(date.getMinutes(), 2);
  }

  private zeroFill(number, width): string {
    width -= number.toString().length;
    if (width > 0) {
      return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return number + ""; // always return a string
  }
}
