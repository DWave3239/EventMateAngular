import { FilterDialogData } from './../models/filterDialogData.model';
import { MAT_DIALOG_DATA, MatDialogRef, NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  startWith,
  debounceTime,
  switchMap, map, catchError
} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { LocationService } from '../location.service';

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
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class FilterDialogComponent implements OnInit {

  public locationAutoComplete$: Observable<string[]> = null;
  autoCompleteControl = new FormControl();

  constructor(
    private location: LocationService,
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FilterDialogData) {
  }

  ngOnInit(): void {
    // this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick().subscribe(_ => {
      this.dialogRef.close(this.data);
    })

    this.locationAutoComplete$ = this.autoCompleteControl.valueChanges.pipe(
      startWith(''),
      // delay emits
      debounceTime(300),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap(value => {
        if (value !== '') {
          // lookup from github
          var result = this.location.autocomplete(value);
          return result;
        } else {
          // if no value is pressent, return null
          return of(null);
        }
      })
    );
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }
  formatLabel(value: number | null) {
    if (!value) {
      return ' 0km ';
    }

    return ' ' + value + 'km ';
  }

  onSelectionChange(option, lon, lat) {
    this.data.lat = lat;
    this.data.lon = lon;
    this.data.locationString = option;
  }

  getCurrentLocation() {
    while (this.location.lat === undefined || this.location.lon === undefined) {
      this.delay(500).then(any => {
      })
    }
    this.data.lat = this.location.lat;
    this.data.lon = this.location.lon;
    this.data.locationString = this.location.lat + ',' + this.location.lon;
  }
}
