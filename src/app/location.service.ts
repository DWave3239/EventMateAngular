import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocationResponse } from './models/filterDialogData.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  public lat:number;
  public lon:number;
  private apiKey = "1457ea73a4146f";

  constructor(private http: HttpClient) {
    this.lat = 0;
    this.lon = 0;
  }

  public getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
          //console.log(this.lat);
          //console.log(this.lon);
          this.getCity(this.lat, this.lon);
        }else{
          console.log("Could not aquire location!");
        }
      }, this.showError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  private showError(error) {
    var message;
    switch (error.code) {
      case error.PERMISSION_DENIED:
        message = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        message = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        message = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        message = "An unknown error occurred."
        break;
    }
    console.log(message);
  }

  private degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  public distanceInKmBetweenEarthCoordinates(lat2:number, lon2:number) {
    var earthRadiusKm = 6371;

    var dLat = this.degreesToRadians(lat2 - this.lat);
    var dLon = this.degreesToRadians(lon2 - this.lon);

    var lat1 = this.degreesToRadians(this.lat);
    lat2 = this.degreesToRadians(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }

  public setLocation(newLat, newLon) {
    //if locationing does not work it is possible to set the coordinates manualy
    this.lat = newLat;
    this.lon = newLon;
  }

  public getCity(latCity, lonCity) {
    this.http.get("https://eu1.locationiq.com/v1/reverse.php?key=" + this.apiKey + "&lat=" + latCity + "&lon=" + lonCity + "&zoom=10&format=json&accept-language=de")
      .subscribe(resp => { console.log(resp) });

    //$.ajax(settings).done(function (response) {
    //console.log(response);
    //document.getElementById('locationName').value = response.display_name;
    // });
  }

  public getCoordinatesOfAddress(street, postalcode, city) {
    this.http.get("https://eu1.locationiq.com/v1/search.php?key=" + this.apiKey + "&street=" + street + "&city=" + city + "&postalcode=" + postalcode + "&format=json&accept-language=de")
      .subscribe(resp => { console.log(resp) });

  }

  public autocomplete(query) {
    return this.http
      .get<LocationResponse>("https://api.locationiq.com/v1/autocomplete.php?key=" + this.apiKey + "&q=" + query + "&limit=5&normalizecity=1&accept-language=de", { observe: 'response' })
      .pipe(map((res) => { return res.body; }));
  }

}
