import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Log } from 'ng2-logger';

import { environment } from '../../../environments/environment';
import { Address } from '../../interfaces/address';

/**
 * A service to work with geolocation stuff
 * @author Daniel Sogl, Tim Krießler
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
   * Get location by zip
   * @param  {string} zip
   * @returns {Promise<any}
   */
  getCoordinatesFromZip(zip: string): Promise<any> {
    return this.http
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${zip},+Germany&key=${
          environment.agmKey
        }`
      )
      .toPromise();
  }

  /**
   * Returns the browser location
   * @returns {Promise<any>}
   */
  getBrowserLocation(): Promise<any> {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  /**
   * calculates distance between two locations
   * @param  {number} latA latA
   * @param  {number} lonA lonA
   * @param  {number} latB latB
   * @param  {number} lonB lonB
   * @returns {number}
   */
  public calculateGpsDistance(
    latA: number,
    lonA: number,
    latB: number,
    lonB: number
  ): number {
    const earthRadiusKm = 6371;

    const dLat = this.degreesToRadians(latB - latA);
    const dLon = this.degreesToRadians(lonB - lonA);

    latA = this.degreesToRadians(latA);
    latB = this.degreesToRadians(latB);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(latA) * Math.cos(latB);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusKm * c;
  }

  /**
   * Calculate degrees to radiant
   * @param  {number} degrees Degree
   * @returns {number}
   */
  public degreesToRadians(degrees: number): number {
    return degrees * Math.PI / 180;
  }
}
