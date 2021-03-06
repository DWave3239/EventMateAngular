import { DetailsDialogComponent } from './../details-dialog/details-dialog.component';
import { MatDialog } from '@angular/material';
import { AddEventDialogComponent } from './../add-event-dialog/add-event-dialog.component';
import { EMEvent } from './../models/emevent.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { FilterService } from '../filter.service';
import { LocationService } from '../location.service';
import { FilterDialogData } from '../models/filterDialogData.model';
import { NewEventService } from '../new-event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: EMEvent[] = [];
  filteredEvents: EMEvent[] = [];
  fdd: FilterDialogData;

  constructor(private _dataService: DataService, private _filterService: FilterService, private _locationService: LocationService, public detailsDialog: MatDialog, private _newEventService: NewEventService) {
    this.loadData();
    this._locationService.getLocation(); //TODO update page
    _filterService.getData().subscribe(fdd => {
      this.fdd = fdd;
      this.applyFilter();
    });
    this._newEventService.events$().subscribe(e => {
      this.loadData();
    });
  }

  ngOnInit() { }

  loadData(): void {
    this.events = [];
    this._dataService.getUpcomingEvent().subscribe((events: EMEvent[]) => {
      this.events = events.filter(e => e.toDate === null || e.toDate >= new Date().getTime());
      this.applyFilter();
    }, error => {
      console.log(`%cERROR: ${error.message}`, `color: red`);
    });
  }

  dateToString(timestamp: number): string {
    let date;
    if (!timestamp) return "no information";
    else date = new Date(timestamp);
    //var days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
    var days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getUTCDay()] + ", " + this.zeroFill(date.getUTCDate(), 2) + "." + this.zeroFill(date.getUTCMonth()+1, 2) + "." + date.getUTCFullYear() + " " + this.zeroFill(date.getHours(), 2) + ":" + this.zeroFill(date.getMinutes(), 2);

  }

  private zeroFill(number, width): string {
    width -= number.toString().length;
    if (width > 0) {
      return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return number + ""; // always return a string
  }

  private applyFilter() {
    this.filteredEvents = this.events;
    if (this.fdd) {
      //console.log(this.fdd);
      // distance check
      if (this.fdd.distance && this.fdd.distance > 0) {
        if (this.fdd.lon !== null && this.fdd.lon !== undefined && this.fdd.lat !== null && this.fdd.lat !== undefined) {
          console.log(this.fdd.distance+" 1\nLon: "+this.fdd.lon+"\nLat: "+this.fdd.lat);
          this.filteredEvents.forEach(e => console.log(this._locationService.distanceInKmBetweenEarthCoordinates(this.fdd.lat, this.fdd.lon, e.lat, e.lon)));
          this.filteredEvents = this.filteredEvents.filter(e => this._locationService.distanceInKmBetweenEarthCoordinates(this.fdd.lat, this.fdd.lon, e.lat, e.lon) <= this.fdd.distance);
        } else {
          console.log(this.fdd.distance+" 2");
          this.filteredEvents.forEach(e => console.log(this._locationService.distanceInKmBetweenHere(e.lon, e.lat)));
          this.filteredEvents = this.filteredEvents.filter(e => this._locationService.distanceInKmBetweenHere(e.lat, e.lon) <= this.fdd.distance);
        }
      }

      // from date check
      if (this.fdd.fromDate) {
        /*console.log("-----------------------------\n"+this.fdd.fromDate.getTime());
        this.filteredEvents.forEach(e => console.log(e.fromDate));*/
        this.filteredEvents = this.filteredEvents.filter(e => e.fromDate >= this.fdd.fromDate.getTime() || e.fromDate === null);
      }

      // to date check
      if (this.fdd.toDate) {
        /*console.log("-----------------------------\n"+this.fdd.toDate.getTime());
        this.filteredEvents.forEach(e => console.log(e.toDate));*/
        this.filteredEvents = this.filteredEvents.filter(e => e.toDate <= this.fdd.toDate.getTime() || e.toDate === null);
      }

      // type check
      if(this.fdd.selectedTypes !== undefined){
        /*console.log(this.fdd.selectedTypes);
        this.filteredEvents.forEach(e => console.log(e.type));*/
        this.filteredEvents = this.filteredEvents.filter(e => this.fdd.selectedTypes.indexOf(e.type) >= 0 || e.type === null || e.type === "" || e.type === undefined);
      }
    }

    this.filteredEvents.sort((a, b) => {
      let lenA, lenB;
      if (this.fdd.lon && this.fdd.lat && this.fdd.lon !== null && this.fdd.lat !== null) {
        lenA = this._locationService.distanceInKmBetweenEarthCoordinates(this.fdd.lon, this.fdd.lat, a.lon, a.lat);
        lenB = this._locationService.distanceInKmBetweenEarthCoordinates(this.fdd.lon, this.fdd.lat, b.lon, b.lat);
      } else {
        lenA = this._locationService.distanceInKmBetweenHere(a.lon, a.lat);
        lenB = this._locationService.distanceInKmBetweenHere(b.lon, b.lat);
      }
      if (lenA < lenB) {
        return -1;
      }
      if (lenA > lenB) {
        return 1;
      }
      return 0;
    });
  }

  showDetails(id: number) {
    let found = false;
    let tempEvent: EMEvent;
    for (let i = 0; i < this.events.length && !found; i++) {
      const event = this.events[i];
      if (event.id === id) {
        found = true;
        tempEvent = event;
      }
    }
    if (found) {
      this.showDetailsDialog(tempEvent);
    }
  }

  showDetailsDialog(event: EMEvent) {
    const dialogRef = this.detailsDialog.open(DetailsDialogComponent, {
      width: '90%',
      maxWidth: '1000px',
      data: event,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
