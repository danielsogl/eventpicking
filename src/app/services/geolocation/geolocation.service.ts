import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Address } from '../../interfaces/address';

/**
 * A service to work with geolocation stuff
 * @author Daniel Sogl
 */
@Injectable()
export class GeolocationService {
  constructor(private http: HttpClient) {}

  getCoordinatesFromAdress(adress: Address): Promise<any> {
    return this.http
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${
          adress.zip
        }+${adress.street}+${adress.streetnumber}&key=${environment.agmKey}`
      )
      .toPromise();
  }

  getBrowserLocation(): Promise<any> {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
}
