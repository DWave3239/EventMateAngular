import { Injectable } from '@angular/core';
import { EMEvent } from './models/emevent.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewEventService {
  private _subject = new Subject<EMEvent>();

  newEvent(event:EMEvent) {
    this._subject.next(event);
  }

  events$():Observable<EMEvent> {
    return this._subject.asObservable();
  }
}
