import { Injectable } from '@angular/core';
import { FilterDialogData } from './models/filterDialogData.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private data: BehaviorSubject<FilterDialogData> = new BehaviorSubject<FilterDialogData>(new FilterDialogData);

  constructor() { }

  getData(): BehaviorSubject<FilterDialogData>{
    return this.data;
  }

  addNode(data:FilterDialogData) {
    this.data.next(data);
  }
}
