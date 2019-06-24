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
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private _http: HttpClient) { }

  // EVENTS
  // GET
  getEvent(): Observable<EMEvent[]> {
    let url = `${this.serverUrl}/events`;
    return this._http.get<EMEvent[]>(url, this.httpOptions);
  }

  // POST
  postEvent(object: EMEvent): Observable<EMEvent> {
    return this._http.post<EMEvent>(`${this.serverUrl}/events`, object, this.httpOptions);
  }

  // DELETE
  deleteEvent(object: EMEvent): Observable<EMEvent> {
    return this._http.delete<EMEvent>(`${this.serverUrl}/events/${object.id}`, this.httpOptions);
  }

  // PUT
  putEvent(object: EMEvent): Observable<EMEvent> {
    return this._http.put<EMEvent>(`${this.serverUrl}/events/${object.id}`, object, this.httpOptions);
  }

  // USERS
  checkLogin(user, pwd): Observable<EMUser> {
    const url = encodeURI(`${this.serverUrl}/users?username=${user}&password=${pwd}`);
    return this._http.get<EMUser>(url, this.httpOptions);
  }

  registerUser(user: EMUser): Observable<EMUser> {
    return this._http.post<EMUser>(`${this.serverUrl}/users`, user, this.httpOptions);
  }

  checkForUser(username): Observable<EMUser> {
    const url = encodeURI(`${this.serverUrl}/users?username=${username}`);
    return this._http.get<EMUser>(url, this.httpOptions);
  }
}
