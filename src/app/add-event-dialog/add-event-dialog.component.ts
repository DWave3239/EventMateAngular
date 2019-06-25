import { Globals } from './../Globals';
import { LocationService } from './../location.service';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { EMEvent } from './../models/emevent.model';
import { DataService } from './../data.service';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { startWith, debounceTime, switchMap } from 'rxjs/operators';
import { template } from '@angular/core/src/render3';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
  },
  display: {
    // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};

export class MyDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat == "input") {
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return this._to2digit(day) + '.' + this._to2digit(month) + '.' + year;
    } else {
      return date.toDateString();
    }
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }
}

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class AddEventDialogComponent implements OnInit {

  public locationAutoComplete$: Observable<string[]> = null;
  autoCompleteControl = new FormControl();

  types = ['party', 'concert', 'theatre'];

  fromDate: Date;
  fromHH: 0;
  fromMM: 0;
  toDate: Date;
  toHH: 0;
  toMM: 0;
  desc: '';
  type: '';
  asset: '';
  title: '';
  locDesc: '';

  newEvent: EMEvent = {
    id: 0,
    creatorId: 0,
    fromDate: 0,
    toDate: 0,
    lon: 0,
    lat: 0,
    desc: '',
    type: '',
    asset: '',
    title: '',
    fromDateString: '',
    toDateString: '',
    locDesc: ''
  }
  constructor(private _dataService: DataService,
    private location: LocationService,
    public dialogRef: MatDialogRef<AddEventDialogComponent>) { }



  ngOnInit() {
    this.dialogRef.backdropClick().subscribe(_ => {
      this.dialogRef.close();
    });

    this.locationAutoComplete$ = this.autoCompleteControl.valueChanges.pipe(
      startWith(''),
      // delay emits
      debounceTime(300),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap(value => {
        if (value !== '') {
          // lookup from github
          var result = this.location.autocomplete(value);
          //result.forEach();
          return result;
          //return of(null);
        } else {
          // if no value is pressent, return null
          return of(null);
        }
      })
    );
  }

  addEvent() {
    var tempFromDate: Date = new Date(this.fromDate.getFullYear(), this.fromDate.getMonth() + 1, this.fromDate.getDay(), this.fromHH, this.fromMM, 0, 0);
    var tempToDate: Date = new Date(this.toDate.getFullYear(), this.toDate.getMonth() + 1, this.toDate.getDay(), this.toHH, this.toMM, 0, 0);
    let tempLat = this.location.lat;
    let tempLon = this.location.lon;
    let tempAsset = 'assets/images/event.png';
    let tempFromDateString = this.fromDate.getDay() + '.' + (this.fromDate.getMonth()+1) + '.' + this.fromDate.getFullYear() + ' ' +  this.fromDate.getHours() + ':' + this.fromDate.getMinutes();
    let tempToDateString = this.toDate.getDay() + '.' + (this.toDate.getMonth()+1) + '.' + this.toDate.getFullYear() + ' ' +  this.toDate.getHours() + ':' + this.toDate.getMinutes();

    this.newEvent = {
      id: null,
      creatorId: 0,
      fromDate: this.fromDate.getTime(),
      toDate: this.toDate.getTime(),
      lon: tempLon,
      lat: tempLat,
      desc: this.desc,
      type: this.type,
      asset: tempAsset,
      title: this.title,
      fromDateString: tempFromDateString,
      toDateString: tempToDateString,
      locDesc: this.locDesc
    }

    this._dataService.postEvent(this.newEvent);
  }

}
