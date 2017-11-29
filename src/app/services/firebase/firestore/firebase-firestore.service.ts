import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Event } from '../../../classes/event';

/**
 * Ein Service für die Kommunikation mit der Firebase Datenbank
 * @author Daniel Sogl
 */
@Injectable()
export class FirebaseFirestoreService {

  /**
   * @param  {AngularFirestore} afs AngularFire Datenbank
   */
  constructor(private afs: AngularFirestore) { }

  getEvent(uid: string): AngularFirestoreDocument<Event> {
    const eventRef: AngularFirestoreDocument<Event> = this.afs.doc(`events/${uid}`);
    return eventRef;
  }

  getPhotographerEvents(uid: string): AngularFirestoreCollection<Event[]> {
    const eventRef: AngularFirestoreCollection<Event[]> = this.afs.collection('events', ref => ref.where('photographerUid', '>=', uid));
    return eventRef;
  }

}
