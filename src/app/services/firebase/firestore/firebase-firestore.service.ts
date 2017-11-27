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

  putEvent(event: Event): Promise<any> {
    const eventRef: AngularFirestoreCollection<any> = this.afs.collection(`events`);
    return eventRef.add(JSON.parse(JSON.stringify(event)));
  }

  getEvent(uid: string): Observable<any> {
    const eventRef: AngularFirestoreDocument<any> = this.afs.doc(`events/${uid}`);
    return eventRef.valueChanges();
  }

  getPhotographerEvents(uid: string): Observable<any[]> {
    const eventRef: AngularFirestoreCollection<any> = this.afs.collection('events', ref => ref.where('photographerUid', '>=', uid));
    return eventRef.valueChanges();
  }

}
