import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Log } from 'ng2-logger';

import { Event } from '../../../classes/event';
import { PrintingHouse } from '../../../classes/printing-house';
import { User } from '../../../classes/user';
import { EventPicture } from '../../../interfaces/event-picture';
import { PhotographerProfile } from '../../../interfaces/photographer-profile';

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
        'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png';
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

  /************************************
   * Firestore: Printing houses
   ************************************/

  /**
   * Returns default printing house
   * @returns AngularFirestoreCollection
   */
  getDefautlPrintingHouse(): AngularFirestoreCollection<PrintingHouse> {
    return this.afs.collection('printingHouses', ref =>
      ref.where('isDefault', '==', true)
    );
  }

  /**
   * Returns a printing house
   * @param  {string} id Printing house id
   * @returns {AngularFirestoreDocument<PrintingHouse>}
   */
  getPrintingHouseById(id: string): AngularFirestoreDocument<PrintingHouse> {
    return this.afs.collection('printingHouses').doc(id);
  }

  /**
   * Retruns a printing house
   * @param  {string} uid User Id
   * @returns {AngularFirestoreCollection<PrintingHouse>}
   */
  getPrintingHouseByUser(
    uid: string
  ): AngularFirestoreCollection<PrintingHouse> {
    return this.afs.collection('printingHouses', ref =>
      ref.where('uid', '==', uid)
    );
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
   * @returns {AngularFirestoreDocument<any>}
   */
  getPhotographerByUrl(url: string): AngularFirestoreDocument<any> {
    return this.afs.doc(`/photographerUrls/${url}`);
  }

  /**
   * Get all photographer profiles
   * @returns {AngularFirestoreCollection<PhotographerProfile>}
   */
  getAllPhotographer(): AngularFirestoreCollection<PhotographerProfile> {
    return this.afs.collection('photographer');
  }

  /**
   * Process payment
   * @param  {any} token Token
   * @param  {any} product Product
   * @param  {string} uid UID
   * @returns {Promise<any>}
   */
  processPayment(token: any, product: any, uid: string): Promise<any> {
    this.log.d('Token', token);
    this.log.d('product', product);
    product.token = token;
    return this.afs
      .collection('users')
      .doc(uid)
      .set(
        {
          subscription: {
            membership: product.name.toLowerCase(),
            token: token.id,
            status: 'processing'
          }
        },
        { merge: true }
      );
  }

  /**
   * Create a firestore UID
   * @returns {string}
   */
  getId(): string {
    return this.afs.createId();
  }
}
