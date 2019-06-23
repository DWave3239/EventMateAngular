import { Component, Inject } from '@angular/core';
import { FilterComponent } from './filter/filter.component';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatListOption } from '@angular/material';

export class DialogData {
  options: string[];
  distance: Number;
  types: string[];
  selectedTypes: string[];
  fromDate: Date;
  toDate: Date;
  enabled: boolean;
  locationString: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('filter') filter: FilterComponent;
  filterData: DialogData = {
    options: ['...', '......'],
    distance: 50,
    types: ['party', 'concert', 'theatre'],
    selectedTypes: ['party', 'concert', 'theatre'],
    fromDate: new Date(Date.now()),
    toDate: new Date(Date.now() + 7 * 86400000), //+7 days
    enabled: true,
    locationString: ''
  }

  title = 'EventMateAngular';
  city = ' your location';

  loggedIn = true;

  user = {
    name: "User"
  }

  hide: boolean;

  constructor(private router: Router, public dialog: MatDialog) {
    this.hide = true;
  }

  login(){
    this.loggedIn = true;
  }

  logout(){
    this.loggedIn = false;
  }

  toggleFilter() {
    this.filter.toggle();
  }

  gotoHome() {
    this.router.navigate(['/']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FilterDialog, {
      width: '90%',
      data: {
        options: this.filterData.options,
        distance: this.filterData.distance,
        types: this.filterData.types,
        selectedTypes: this.filterData.selectedTypes,
        fromDate: this.filterData.fromDate,
        toDate: this.filterData.toDate,
        enabled: this.filterData.enabled,
        locationString: this.filterData.locationString
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.filterData = result;
    });
  }
}


@Component({
  selector: 'filter-dialog',
  templateUrl: 'dialogs/filter-dialog.html',
  styleUrls: ['dialogs/filter-dialog.css']
})
export class FilterDialog {

  constructor(
    public dialogRef: MatDialogRef<FilterDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
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
