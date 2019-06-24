import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EMEvent } from './models/emevent.model'
import { EMUser } from './models/emuser.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverUrl = 'http://localhost:3000';

  constructor(private _http: HttpClient) { }

  // EVENTS
  // GET
  getEvent(): Observable<EMEvent[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let url = `${this.serverUrl}/events`;
    return this._http.get<EMEvent[]>(url, httpOptions);
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

  // USERS
  checkLogin(user, pwd): Observable<EMUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const url = encodeURI(`${this.serverUrl}/users?username=${user}&password=${pwd}`);
    return this._http.get<EMUser>(url, httpOptions);
  }

  registerUser(user: EMUser): Observable<EMUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post<EMUser>(`${this.serverUrl}/users`, user, httpOptions);
  }
}
