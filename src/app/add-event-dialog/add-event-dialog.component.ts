import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { EMEvent } from './../models/emevent.model';
import { DataService } from './../data.service';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { startWith, debounceTime, switchMap } from 'rxjs/operators';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NewEventService } from '../new-event.service';
import { EventLocationService } from '../event-location.service';

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
      private location: EventLocationService,
      public dialogRef: MatDialogRef<AddEventDialogComponent>,
      private _snackBar: MatSnackBar,
      private _userService: UserService,
      private router: Router,
      private _newEventService: NewEventService) {
    if(!this._userService.user){
      this.openSnackBar("You have to be logged in to add an event.");
      this.dialogRef.close();
    }
  }

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
    var tempFromDate: Date = new Date(this.fromDate.getFullYear(), this.fromDate.getMonth() + 1, this.fromDate.getDate(), this.fromHH, this.fromMM, 0, 0);
    var tempToDate: Date = new Date(this.toDate.getFullYear(), this.toDate.getMonth() + 1, this.toDate.getDate(), this.toHH, this.toMM, 0, 0);
    let tempLat = this.location.lat;
    let tempLon = this.location.lon;
    let tempAsset = 'assets/images/event.png';
    this.fromDate.setHours(this.fromHH);
    this.fromDate.setMinutes(this.fromMM);
    this.toDate.setHours(this.toHH);
    this.toDate.setMinutes(this.toMM);
    let tempFromDateString = this.zeroFill(this.fromDate.getDate(), 2) + '.' + this.zeroFill(this.fromDate.getMonth()+1, 2) + '.' + this.fromDate.getFullYear() + ' ' +  this.zeroFill(this.fromDate.getHours(), 2) + ':' + this.zeroFill(this.fromDate.getMinutes(), 2);
    let tempToDateString = this.zeroFill(this.toDate.getDate(), 2) + '.' + this.zeroFill(this.toDate.getMonth()+1, 2) + '.' + this.toDate.getFullYear() + ' ' +  this.zeroFill(this.toDate.getHours(), 2) + ':' + this.zeroFill(this.toDate.getMinutes(), 2);

    this.newEvent = {
      id: null,
      creatorId: this._userService.user.id,
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

    this._dataService.postEvent(this.newEvent).subscribe(e => {
      this.openSnackBar("Your event has been successfully added!");
      this._newEventService.newEvent(e);
      this.dialogRef.close();
      this.router.navigate([this.router.url]);
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 3000,
    });
  }

  private zeroFill(number, width): string {
    width -= number.toString().length;
    if (width > 0) {
      return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return number + ""; // always return a string
  }
}
