import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Log } from 'ng2-logger';

import { Event } from '../../../classes/event';
import { PrintingHouse } from '../../../interfaces/printing-house';
import { User } from '../../../classes/user';
import { EventPicture } from '../../../interfaces/event-picture';
import { PhotographerProfile } from '../../../interfaces/photographer-profile';
import { PriceList } from '../../../classes/price-list';

/**
 * Service to comunicate with the Firestore database
 * @author Daniel Sogl
 */
@Injectable()
export class FirebaseFirestoreService {
  /** Logger */
  private log = Log.create('FirebaseFirestoreService');

  /**
   * Constructor
   * @param  {AngularFirestore} afs AngularFire Firestore
   */
  constructor(private afs: AngularFirestore) {
    this.log.color = 'green';
    this.log.d('Service injected');
  }

  /************************************
   * Firestore: User
   ************************************/

  /**
   * Update user data
   * @param  {any} user User
   * @returns {Promise<void>}
   */
  updateUserData(user: any): Promise<void> {
    this.log.d('Update user in firestore', user);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    if (!user.roles) {
      user = new User(user);
    }
    if (!user.photoUrl) {
      user.photoUrl =
        'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png';
    }
    if (user.photographerUrl) {
      this.afs
        .doc(`photographerUrls/${user.photographerUrl}`)
        .set({ uid: user.uid });
    }
    return userRef.set(JSON.parse(JSON.stringify(user)));
  }

  /**
   * Get user
   * @param  {string} uid UID
   * @returns {AngularFirestoreDocument<User>}
   */
  getUser(uid: string): AngularFirestoreDocument<User> {
    return this.afs.doc<User>(`users/${uid}`);
  }

  /**
   * Check photographer url
   * @param  {string} photographerUrl URL
   * @returns {AngularFirestoreDocument<any>}
   */
  checkDisplayname(photographerUrl: string): AngularFirestoreDocument<any> {
    return this.afs.doc(`photographerUrls/${photographerUrl.toLowerCase()}`);
  }

  /**
   * Get all user
   * @returns {AngularFirestoreCollection<User>}
   */
  getAllUser(): AngularFirestoreCollection<User> {
    return this.afs.collection('users');
  }

  /**
   * Delete user
   * @param  {User} uid User uid to delete
   * @returns {Promise<void>}
   */
  deleteUser(uid: string): Promise<void> {
    return this.afs
      .collection('users')
      .doc(uid)
      .delete();
  }

  /************************************
   * Firestore: Printing houses
   ************************************/

  /**
   * Returns default printing house
   * @returns AngularFirestoreCollection
   */
  getDefautlPrintingHouse(): AngularFirestoreCollection<PrintingHouse> {
    return this.afs.collection('printing-houses', ref =>
      ref.where('isDefault', '==', true)
    );
  }

  /**
   * Returns a printing house
   * @param  {string} id Printing house id
   * @returns {AngularFirestoreDocument<PrintingHouse>}
   */
  getPrintingHouseById(id: string): AngularFirestoreDocument<PrintingHouse> {
    return this.afs.collection('printing-houses').doc(id);
  }

  /**
   * Retruns a printing house
   * @param  {string} uid User Id
   * @returns {AngularFirestoreCollection<PrintingHouse>}
   */
  getPrintingHouseByUser(
    uid: string
  ): AngularFirestoreCollection<PrintingHouse> {
    return this.afs.collection('printing-houses', ref =>
      ref.where('uid', '==', uid)
    );
  }

  /**
   * Create prin ting house
   * @param  {PrintingHouse} printingHouse Printing house
   * @returns {Promise<void>}
   */
  createPrintingHouse(printingHouse: PrintingHouse): Promise<void> {
    return this.afs
      .collection('printing-houses')
      .doc(printingHouse.id)
      .set(JSON.parse(JSON.stringify(printingHouse)));
  }

  updatePrintingHouse(printingHouse: PrintingHouse): Promise<void> {
    return this.afs
      .collection('printing-houses')
      .doc(printingHouse.id)
      .update(JSON.parse(JSON.stringify(printingHouse)));
  }

  /************************************
   * Firestore: Price Lists
   ************************************/

  /**
   * Get photographer price list
   * @param  {string} photographer Photographer UID
   * @returns {AngularFirestoreDocument<PriceList>}
   */
  getPriceList(photographer: string): AngularFirestoreDocument<PriceList> {
    return this.afs.collection('price-lists').doc(photographer);
  }

  /**
   * Create photographer price list
   * @param  {PriceList} priceList Price list
   * @param  {string} photographer Photographer UID
   * @returns {Promise<void>}
   */
  createPriceList(priceList: PriceList, photographer: string): Promise<void> {
    return this.afs
      .collection('price-lists')
      .doc(photographer)
      .set(JSON.parse(JSON.stringify(priceList)));
  }

  /**
   * Update photographer price list
   * @param  {PriceList} priceList Price list
   * @param  {string} photographer Photographer UID
   * @returns {Promise<void>}
   */
  updatePriceList(priceList: PriceList, photographer: string): Promise<void> {
    return this.afs
      .collection('price-lists')
      .doc(photographer)
      .update(JSON.parse(JSON.stringify(priceList)));
  }

  /************************************
   * Firestore: Events
   ************************************/

  /**
   * Get event by id
   * @param  {string} id ID
   * @returns {AngularFirestoreDocument<Event>}
   */
  getEvent(id: string): AngularFirestoreDocument<Event> {
    return this.afs.doc(`events/${id}`);
  }

  /**
   * Create event
   * @param  {Event} event Event
   * @returns {Promise<void>}
   */
  createEvent(event: Event): Promise<void> {
    return this.afs
      .collection('events')
      .doc(event.id)
      .set(JSON.parse(JSON.stringify(event)));
  }

  /**
   * Get all events
   * @returns {AngularFirestoreCollection<Event>}
   */
  getAllEvents(): AngularFirestoreCollection<Event> {
    return this.afs.collection('events');
  }

  /**
   * Get photographer events
   * @param  {string} uid UID
   * @returns {AngularFirestoreCollection<Event[]>}
   */
  getPhotographerEvents(uid: string): AngularFirestoreCollection<Event> {
    return this.afs.collection('events', ref =>
      ref.where('photographerUid', '==', uid)
    );
  }

  /**
   * Set Event "deleted" value to true
   * @param  {string} id Event Id
   * @returns {Promise<void>}
   */
  deletePhotographerEvent(id: string): Promise<void> {
    return this.afs
      .collection('events')
      .doc(id)
      .update({ deleted: true });
  }

  /**
   * Update an event
   * @param  {Event} event Event to update
   * @returns {Promise<void>}
   */
  updatePhotographerEvent(event: Event): Promise<void> {
    return this.afs
      .collection('events')
      .doc(event.id)
      .update(JSON.parse(JSON.stringify(event)));
  }

  /************************************
   * Firestore: Images
   ************************************/

  /**
   * Get event pictures
   * @param  {string} id ID
   * @returns {AngularFirestoreCollection<EventPicture>}
   */
  getEventPictures(id: string): AngularFirestoreCollection<EventPicture> {
    return this.afs
      .collection('events')
      .doc(id)
      .collection('images');
  }

  /**
   * Get event pictures
   * @param  {string} id ID
   * @returns {AngularFirestoreCollection<EventPicture>}
   */
  getEventOriginalPictures(
    id: string
  ): AngularFirestoreCollection<EventPicture> {
    return this.afs
      .collection('events')
      .doc(id)
      .collection('originals');
  }

  /**
   * Delete image firestore document
   * @param  {string} event Event ID
   * @param  {string} image Image ID
   * @returns {Promise<void>}
   */
  deleteEventImage(event: string, image: string): Promise<void> {
    return this.afs
      .collection('events')
      .doc(event)
      .collection('images')
      .doc(image)
      .delete();
  }

  /**
   * Update event picture information
   * @param  {EventPicture} image Image object
   * @param  {string} event Event id
   * @returns {Promise<void>}
   */
  updateImage(image: EventPicture, event: string): Promise<void> {
    return this.afs
      .collection('events')
      .doc(event)
      .collection('images')
      .doc(image.id)
      .update(JSON.parse(JSON.stringify(image)));
  }

  /************************************
   * Firestore: Photographer Profile
   ************************************/

  /**
   * Get photographer profile by id
   * @param  {string} uid UID
   * @returns {AngularFirestoreDocument<PhotographerProfile>}
   */
  getPhotographerProfile(
    uid: string
  ): AngularFirestoreDocument<PhotographerProfile> {
    return this.afs.doc(`/photographer/${uid}`);
  }

  /**
   * Get photogreapher by url
   * @param  {string} url URL
   * @returns {AngularFirestoreCollection<PhotographerProfile>}
   */
  getPhotographerByUrl(
    url: string
  ): AngularFirestoreCollection<PhotographerProfile> {
    return this.afs.collection('photographer', ref =>
      ref.where('profileUrl', '==', url)
    );
  }

  /**
   * Get all photographer profiles
   * @returns {AngularFirestoreCollection<PhotographerProfile>}
   */
  getAllPhotographer(): AngularFirestoreCollection<PhotographerProfile> {
    return this.afs.collection('photographer');
  }

  /************************************
   * Firestore: Utility
   ************************************/

  /**
   * Create a firestore UID
   * @returns {string}
   */
  getId(): string {
    return this.afs.createId();
  }
}
