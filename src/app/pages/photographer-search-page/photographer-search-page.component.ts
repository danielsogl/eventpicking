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

  /** Photographer profiles collection */
  public photographer: Observable<PhotographerProfile[]>;

  /** Photographer profile */
  public photograph: PhotographerProfile = {
    about: '',
    email: '',
    facebook: '',
    instagram: '',
    name: '',
    phone: '',
    tumbler: '',
    twitter: '',
    uid: '',
    website: '',
    premium: false,
    location: {
      lat: 0,
      lng: 0
    }
  };

  /** save browserposition */
  private positionlat: number;
  private positionlng: number;

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
    this.photographer.subscribe(photographer => {
      this.log.d('Photographerprofiles', photographer);
    });

    // Get browser geolocation
    if (!!navigator.geolocation) {
      /* geolocation is available */
      this.geolocation
        .getBrowserLocation()
        .then(position => {
          this.log.d('Current position', position.coords);
          this.setPosition(position.coords.latitude, position.coords.longitude);
          this.positionlat = position.coords.latitude;
          this.positionlng = position.coords.longitude;
        })
        .catch((err: any) => {
          this.log.er('Error getting location', err);
        });
    }
  }

  getPhotographerDistance(photographer: PhotographerProfile) {
    return this.geolocation.calculateGpsDistance(
      photographer.location.lat,
      photographer.location.lng,
      this.positionlat,
      this.positionlng
    );
  }

  /**
   * Set the possition on the map
   * @param  {number} latitude Latitude
   * @param  {number} longitude Longitude
   */
  setPosition(latitude: number, longitude: number) {
    this.agmMap.latitude = latitude;
    this.agmMap.longitude = longitude;
    this.agmMap.zoom = 15;
    this.agmMap.triggerResize();
  }

  /** return input value */
  onKey(event: any) {
    if (+event.target.value && event.target.value.length === 5) {
      this.handleEnteredZip(event.target.value);
    }
  }

  /** get entered zip, convert zip to coordinates, refresh map */
  handleEnteredZip(zip: string) {
    this.log.info('valid zip-length entered');
    this.geolocation.getCoordinatesFromZip(zip).then((result: any) => {
      if (result.results[0].geometry.location) {
        this.photograph.location = result.results[0].geometry.location;
        this.setPosition(
          this.photograph.location.lat,
          this.photograph.location.lng
        );
        // TODO: Fotografenliste aktualisieren (Radius 10-20km)
      } else {
        this.log.error('Cannot get location from Service');
      }
    });
  }
}
