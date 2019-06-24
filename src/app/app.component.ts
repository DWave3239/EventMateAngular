import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { FilterDialogData } from './models/filterDialogData.model';
import { Component, Inject } from '@angular/core';
import { FilterComponent } from './filter/filter.component';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatListOption } from '@angular/material';
import { EMUser } from './models/emuser.model'
import { DataService } from './data.service';
import { FilterService } from './filter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('filter') filter: FilterComponent;
  public filterData: FilterDialogData = {
    options: ['...', '......'],
    distance: 50,
    types: ['party', 'concert', 'theatre'],
    selectedTypes: ['party', 'concert', 'theatre'],
    fromDate: new Date(Date.now()),
    toDate: new Date(Date.now() + 7 * 86400000), //+7 days
    enabled: true,
    locationString: '',
    lon: null,
    lat: null
  }

  title = 'EventMateAngular';
  city = ' your location';

  loggedIn = false;

  user: EMUser;
  // REMOVE INITIALIZATION in production build
  username: string = "test";
  password: string = "testuser";

  sitesWithoutFilters = ['/about'];

  filterPic = "Off";

  hide: boolean;

  constructor(public router: Router, public dialog: MatDialog, private _dataService: DataService, private _filterService: FilterService) {
    this.hide = true;
  }

  login() {
    this._dataService.checkLogin(this.username, this.password).subscribe(user => {
      if (user[0]) {
        this.user = user[0];
        this.loggedIn = true;
      } else {
        console.log(`%cUsername and Password combination not found`, `background-color: yellow`);
      }
    }, error => {
      console.log(`%cUsername and Password combination not found`, `background-color: yellow`);
    });
  }

  logout() {
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
      maxWidth: '1000px',
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
      //console.log(result);
      if (result) {
        this.filterData = result;
        if (result.enabled) {
          this._filterService.addNode(result);
          this.filterPic = "On";
        } else {
          this._filterService.addNode(new FilterDialogData);
          this.filterPic = "Off";
        }
      }
    });
  }

  public routeToHeader(route: string) {
    var routes = { '/': 'NEAR ' + this.city, '/about': "About" };
    return routes[route];
  }
}
