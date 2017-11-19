import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { User } from '../../../classes/user';
import { Router } from '@angular/router/src/router';

/**
 * A service to authenticate with the firebase services
 * @author Daniel Sogl
 */
@Injectable()
export class FirebaseAuthService {

  /**
   * Firebase user
   */
  public user: Observable<User>;

  /**
   * roles of currently logged in uer
   */
  private userRoles: Array<string>;

  /**
   * @param  {AngularFireAuth} afAuth AngularFire Auth
   * @param  {AngularFireDatabase} db AngularFire Auth
   */
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {

    this.user = this.afAuth.authState.switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return Observable.of(null);
      }
    });
  }

  getCurrentFirebaseUser() {
    return this.afAuth.auth.currentUser;
  }

  /**
   * Signs the user in
   * @param  {string} email user e-mail
   * @param  {string} password user password
   * @returns {Promise<any>}
   */
  signIn(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(credential => {
      this.updateUserData(credential.user);
    });
  }

  /**
   * Signs user out
   * @returns {Promise<any>}
   */
  signOut(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  /**
   * Send a password reset mail
   * @param  {string} email Email
   * @returns {Promise<any>}
   */
  sendResetPasswordMail(email: string): Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  private updateUserData(user: any) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data = new User(user);

    return userRef.set(data);
  }

  /**
  * Helper to determine if any matching roles exist
  * @param  {any} allowedRoles roles to check
  * @returns {boolean}
  */
  public matchingRole(allowedRoles: any): boolean {
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles));
  }

}
