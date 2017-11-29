import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { User } from '../../../classes/user';

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
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return Observable.of(null);
      }
    });
  }

  getAuthState(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  getCurrentFirebaseUser(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

  /**
   * Signs the user in
   * @param  {string} email user e-mail
   * @param  {string} password user password
   * @returns {Promise<any>}
   */
  signInWithEmail(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  /**
   * Signs user in with his Google account
   * @returns {Promise<any>}
   */
  signInWithGoogle(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateUserData(credential.user);
    });
  }

  /**
   * Signs user in with his Facebook account
   * @returns {Promise<any>}
   */
  signInWithFacebook(): Promise<any> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateUserData(credential.user);
    });
  }

  /**
   * Signs user in with his twitter account
   * @returns {Promise<any>}
   */
  signInWithTwitter(): Promise<any> {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateUserData(credential.user);
    });
  }

  /**
   * @returns {Promise<any>}
   */
  register(email: string, password: string): Promise<any> {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.updateUserData(credential);
      });
  }

  /**
   * Signs user out
   * @returns {Promise<any>}
   */
  signOut(): Promise<any> {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['home']);
    });
  }

  /**
   * Send a password reset mail
   * @param  {string} email Email
   * @returns {Promise<any>}
   */
  sendResetPasswordMail(email: string): Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  /**
   * Updates users profile in the firebase firestore
   * @param  {any} user
   * @returns {Promise<void>}
   */
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

  /**
   * Helper to determine if any matching roles exist
   * @param  {any} allowedRoles roles to check
   * @returns {boolean}
   */
  public matchingRole(allowedRoles: any): boolean {
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles));
  }
}
