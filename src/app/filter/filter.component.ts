import { Component, OnInit } from '@angular/core';
import { trigger, transition, state, animate, style, AnimationEvent } from '@angular/animations';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-filter',
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '400px',
        opacity: 1
      })),
      state('closed', style({
        height: '0px',
        opacity: 0.5
      })),
      transition('* => *', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  isOpen = false;
  options: string[] = ['...'];
  distance = 50;
  fromDate: Date = new Date(Date.now());
  toDate: Date = new Date(Date.now() + 7 * 86400000); //+7 days
  isEnabled: boolean = true;
  locationString: string = '';

  constructor(private location: LocationService) { }

  ngOnInit() {
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  formatLabel(value: number | null) {
    if (!value) {
      return '0km';
    }

    return value + 'km';
  }

  onFilterEnabledChange(event) {
    this.isEnabled = event.checked;
    this.applyFilter();
  }

  onDistanceChange(event) {
    this.distance = event.value;
    this.applyFilter();
  }

  onFromDateChange(event) {
    if (event.value)
      this.fromDate = event.value;
    else this.fromDate = new Date(Date.now());
    this.applyFilter();
  }

  onToDateChange(event) {
    if (event.value)
      this.toDate = event.value;
    this.applyFilter();
  }

  onLocationChange(event) {
    console.log(this.locationString);
    ['1', '2'];
  }

  onSelectionChange(event) {
    this.locationString = event.option.value;
    this.applyFilter();
  }

  private applyFilter() {

  }

}
