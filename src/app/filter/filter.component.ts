import { Component, OnInit } from '@angular/core';
import { trigger, transition, state, animate, style, AnimationEvent } from '@angular/animations';

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
        animate('0.7s')
      ]),
    ]),
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  isOpen = false;
  options: string[] = ['One', 'Two', 'Three'];
  constructor() { }

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

}
