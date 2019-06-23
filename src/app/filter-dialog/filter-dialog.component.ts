import { FilterDialogData } from './../models/filterDialogData.model';
import { MAT_DIALOG_DATA, MatDialogRef, NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

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


  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FilterDialogData) {
  }

  ngOnInit(): void {
    // this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick().subscribe(_ => {
      this.dialogRef.close(this.data);
    })
  }

  formatLabel(value: number | null) {
    if (!value) {
      return ' 0km ';
    }

    return ' ' + value + 'km ';
  }

  onSelectionChange(event) {
    this.data.locationString = event.option.value;
  }



  private applyFilter() {
    // TODO
  }

}
