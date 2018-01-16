import { AgmMap } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Log } from 'ng2-logger';

import { PhotographerProfile } from '../../interfaces/photographer-profile';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';
import { GeolocationService } from '../../services/geolocation/geolocation.service';

/**
 * Photographer search page component
 * @author Daniel Sogl, Tim Krießler
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
  public photographer: PhotographerProfile[] = [];

  /** Edited photographer profiles collection */
  public editedPhotographer: PhotographerProfile[] = [];

  /** indicator for parting line */
  public hasBothProfiles: boolean;

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
    profileUrl: '',
    location: {
      lat: 0,
      lng: 0
    }
  };

  /** Users Latitutde */
  private userLat: number;
  /** Users Longitude */
  private userLng: number;

  /** Google maps ref */
  @ViewChild('map') public agmMap: AgmMap;

  /**
   * Constructor
   * @param  {GeolocationService} geolocation Geolocation Service
   * @param  {FirebaseFirestoreService} afs Firebase Firestore Service
   */
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
    this.agmMap.zoom = 11;

    // Load all photographer profiles
    this.afs
      .getAllPhotographer()
      .valueChanges()
      .subscribe(photographer => {
        this.photographer = photographer;
        // Get browser geolocation
        if (!!navigator.geolocation) {
          /* geolocation is available */
          this.geolocation
            .getBrowserLocation()
            .then(position => {
              this.log.d('Current position', position.coords);
              this.setPosition(
                position.coords.latitude,
                position.coords.longitude
              );
              this.userLat = position.coords.latitude;
              this.userLng = position.coords.longitude;
              // Show photographer profiles of users area
              this.refreshPhotographerList();
            })
            .catch((err: any) => {
              this.log.er('Error getting location', err);
            });
        }
      });
  }

  /**
   * return number of kilometres between a certain photographer and the user position
   * @param  {PhotographerProfile} photographer Photographer profile
   * @returns {number}
   */
  getPhotographerDistance(photographer: PhotographerProfile): number {
    return this.geolocation.calculateGpsDistance(
      photographer.location.lat,
      photographer.location.lng,
      this.userLat,
      this.userLng
    );
  }

  /**
   * Set the position on the map
   * @param  {number} latitude Latitude
   * @param  {number} longitude Longitude
   */
  setPosition(latitude: number, longitude: number) {
    this.agmMap.latitude = latitude;
    this.agmMap.longitude = longitude;
    this.agmMap.zoom = 11;
    this.agmMap.triggerResize();
  }

  /**
   * return input value
   * @param  {any} eventm Event
   */
  onKey(event: any) {
    if (+event.target.value && event.target.value.length === 5) {
      this.handleEnteredZip(event.target.value);
    }
    // TODO: Alert for valid and invalid zip
  }

  /**
   * get entered zip, convert zip to coordinates, refresh map
   * @param  {string} zip ZIP
   */
  handleEnteredZip(zip: string) {
    this.log.info('valid zip-length entered');
    this.geolocation.getCoordinatesFromZip(zip).then((result: any) => {
      if (result.results[0].geometry.location) {
        this.photograph.location = result.results[0].geometry.location;
        this.setPosition(
          this.photograph.location.lat,
          this.photograph.location.lng
        );
        this.userLat = this.photograph.location.lat;
        this.userLng = this.photograph.location.lng;
        this.refreshPhotographerList();
      } else {
        this.log.error('Cannot get location from Service');
      }
    });
  }

  /**
   * add photographers to displayed list when they are in the users area
   */
  refreshPhotographerList() {
    // clean displayed list
    if (this.editedPhotographer) {
      this.editedPhotographer.splice(0);
    }

    // add photographers in the circle of 10 kilometres
    this.addPhotographerInCircle(10);
    this.agmMap.zoom = 11;
    /** if there are no photographers in the circle of 10 kilometres,
     * add photographers in the circle of 25 kilometres
     */
    if (!this.editedPhotographer.length) {
      // TODO: Alert that circle is extended
      this.addPhotographerInCircle(25);
      this.agmMap.zoom = 10;
    }
  }

  addPhotographerInCircle(circle: number) {
    let hasPremium: boolean;
    let hasStandard: boolean;
    hasPremium = false;
    hasStandard = false;
    this.hasBothProfiles = false;

    for (let i = 0; i < this.photographer.length; i++) {
      let distance: number;
      distance = this.getPhotographerDistance(this.photographer[i]);

      // add all photographers in the circle
      if (distance <= circle) {
        this.editedPhotographer.push(this.photographer[i]);

        /** check whether parting line is required */
        if (this.photographer[i].premium) {
          hasPremium = true;
        } else if (!this.photographer[i].premium) {
          hasStandard = true;
        }
      }
    }
    if (hasPremium && hasStandard) {
      this.hasBothProfiles = true;
    }
  }
}
