import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Log } from 'ng2-logger';

import { environment } from '../../../environments/environment';
import { Address } from '../../interfaces/address';

/**
 * A service to handle geolocation requests
 * @author Daniel Sogl
 */
@Injectable()
export class GeolocationService {
  /** Logger */
  private log = Log.create('GeolocationService');

  /**
   * Constructor
   * @param  {HttpClient} http Http Client
   */
  constructor(private http: HttpClient) {}

  /**
   * Get location by address from the Google Maps Api
   * @param  {Address} adress Adress
   * @returns {Promise<any>}
   */
  getCoordinatesFromAdress(adress: Address): Promise<any> {
    return this.http
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${
          adress.zip
        }+${adress.street}+${adress.streetnumber}&key=${environment.agmKey}`
      )
      .toPromise();
  }

  /**
   * Get Web-Browser GPS location
   * @returns {Promise<any>}
   */
  getBrowserLocation(): Promise<any> {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
}
