import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EMEvent } from './models/emevent.model'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverUrl = 'http://localhost:3000';

  constructor(private _http: HttpClient) { }

  // GET
  getEvent(): Observable<EMEvent[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get<EMEvent[]>(`${this.serverUrl}/events`, httpOptions);
  }

  // POST
  postEvent(object: EMEvent): Observable<EMEvent> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post<EMEvent>(`${this.serverUrl}/events`, object, httpOptions);
  }

  // DELETE
  deleteEvent(object: EMEvent): Observable<EMEvent> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.delete<EMEvent>(`${this.serverUrl}/events/${object.id}`, httpOptions);
  }

  // PUT
  putEvent(object: EMEvent): Observable<EMEvent> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.put<EMEvent>(`${this.serverUrl}/events/${object.id}`, object, httpOptions);
  }
}
