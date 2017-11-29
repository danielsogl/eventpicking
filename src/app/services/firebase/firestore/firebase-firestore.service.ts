import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Log } from 'ng2-logger';

import { Event } from '../../../classes/event';
import { User } from '../../../classes/user';

/**
 * Ein Service für die Kommunikation mit der Firebase Datenbank
 * @author Daniel Sogl
 */
@Injectable()
export class FirebaseFirestoreService {
  private log = Log.create('FirebaseFirestoreService');

  /**
   * @param  {AngularFirestore} afs AngularFire Datenbank
   */
  constructor(private afs: AngularFirestore) {
    this.log.color = 'green';
    this.log.d('Service injected');
  }

  updateUserData(user: any): Promise<void> {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    if (!user.roles) {
      user = new User(user);
    }
    return userRef.set(JSON.parse(JSON.stringify(user)));
  }

  getUser(uid: string): AngularFirestoreDocument<User> {
    return this.afs.doc<User>(`users/${uid}`);
  }

  getEvent(uid: string): AngularFirestoreDocument<Event> {
    const eventRef: AngularFirestoreDocument<Event> = this.afs.doc(
      `events/${uid}`
    );
    return eventRef;
  }

  getPhotographerEvents(uid: string): AngularFirestoreCollection<Event[]> {
    const eventRef: AngularFirestoreCollection<Event[]> = this.afs.collection(
      'events',
      ref => ref.where('photographerUid', '==', uid)
    );
    return eventRef;
  }
}
