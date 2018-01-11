import { AgmMap } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Log } from 'ng2-logger';
import { Observable } from 'rxjs/Observable';

import { PhotographerProfile } from '../../interfaces/photographer-profile';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';
import { GeolocationService } from '../../services/geolocation/geolocation.service';

/**
 * Photographer search page component
 * @author Daniel Sogl
 */
@Component({
  selector: 'app-photographer-search-page',
  templateUrl: './photographer-search-page.component.html',
  styleUrls: ['./photographer-search-page.component.scss']
})
export class PhotographerSearchPageComponent implements OnInit {
  /** Logger */
  private log = Log.create('PhotographerSearchPageComponent');

  /** Photographer profiles */
  public photographer: Observable<PhotographerProfile[]>;

  /** Google maps ref */
  @ViewChild('map') public agmMap: AgmMap;

  constructor(
    private geolocation: GeolocationService,
    private afs: FirebaseFirestoreService
  ) {}

  /**
   * Initialize component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    // Init map
    this.agmMap.latitude = 51.165691;
    this.agmMap.longitude = 10.451526000000058;
    this.agmMap.zoom = 10;

    // Load all photographer profiles
    this.photographer = this.afs.getAllPhotographer().valueChanges();
    this.photographer.subscribe(photographers => {
      this.log.d('Photographerprofiles', photographers);
    });

    // Get browser geolocation
    if (!!navigator.geolocation) {
      /* geolocation is available */
      this.geolocation
        .getBrowserLocation()
        .then(position => {
          this.log.d('Current possition', position.coords);
          this.setPosition(position.coords.latitude, position.coords.longitude);
        })
        .catch((err: any) => {
          this.log.er('Error getting location', err);
        });
    }
  }

  /**
   * Set the possition on the map
   * @param  {number} latitude Latitude
   * @param  {number} longitude Longitude
   */
  setPosition(latitude: number, longitude: number) {
    this.agmMap.latitude = latitude;
    this.agmMap.longitude = longitude;
    this.agmMap.zoom = 10;
    this.agmMap.triggerResize();
  }
}
