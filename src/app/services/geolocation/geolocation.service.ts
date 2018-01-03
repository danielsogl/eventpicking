import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * A service to work with geolocation stuff
 * @author Daniel Sogl
 */
@Injectable()
export class GeolocationService {
  constructor(private http: HttpClient) {}

  getCoordinatesFromZip(zip: string): Promise<any> {
    return this.http
      .get(`http://maps.googleapis.com/maps/api/geocode/json?address=${zip}`)
      .toPromise();
  }

  getBrowserLocation(): Promise<any> {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
}
