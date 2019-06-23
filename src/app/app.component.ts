import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { FilterDialogData } from './models/filterDialogData.model';
import { Component, Inject } from '@angular/core';
import { FilterComponent } from './filter/filter.component';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatListOption } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('filter') filter: FilterComponent;
  filterData: FilterDialogData = {
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

  sitesWithoutFilters = ['/about'];

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
    const dialogRef = this.dialog.open(FilterDialogComponent, {
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
