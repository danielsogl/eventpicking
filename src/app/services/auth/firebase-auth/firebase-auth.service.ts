import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import * as _ from 'lodash';
import { Log } from 'ng2-logger';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

import { User } from '../../../classes/user';
import { FirebaseFirestoreService } from '../../firebase/firestore/firebase-firestore.service';

/**
 * A service to authenticate with the firebase services
 * @author Daniel Sogl
 */
@Injectable()
export class FirebaseAuthService {
  /** Logger */
  private log = Log.create('FirebaseAuthService');
  /** Firebase user */
  public user: Observable<User>;

  /** roles of currently logged in uer */
  private userRoles: Array<string>;

  /**
   * Constructor
   * @param  {AngularFireAuth} afAuth AngularFire Auth
   * @param  {FirebaseFirestoreService} afs Firestore Service
   * @param  {Router} router Router
   */
  constructor(
    private afAuth: AngularFireAuth,
    private afs: FirebaseFirestoreService,
    private router: Router
  ) {
    this.log.color = 'green';
    this.log.d('Service injected');
    this.user = this.afAuth.authState.switchMap(user => {
      if (user) {
        return this.afs.getUser(user.uid).valueChanges();
      } else {
        return Observable.of(null);
      }
    });
  }

  /**
   * Get user auth state
   * @returns {Observable}
   */
  public getAuthState(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  /**
   * Get current firebase user
   * @returns {firebase.User}
   */
  public getCurrentFirebaseUser(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

  /**
   * Signs the user in
   * @param  {string} email user e-mail
   * @param  {string} password user password
   * @returns {Promise<any>}
   */
  public signInWithEmail(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  /**
   * Signs User in with OAuth
   * @param  {any} provider Auth provider
   * @returns {Promise<any>}
   */
  public signInWithOAuth(provider: any): Promise<any> {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.afs.updateUserData(credential.user);
    });
  }

  /**
   * Signs user in with his Google account
   * @returns {Promise<any>}
   */
  public signInWithGoogle(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.signInWithOAuth(provider);
  }

  /**
   * Signs user in with his Facebook account
   * @returns {Promise<any>}
   */
  public signInWithFacebook(): Promise<any> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.signInWithOAuth(provider);
  }

  /**
   * Signs user in with his twitter account
   * @returns {Promise<any>}
   */
  public signInWithTwitter(): Promise<any> {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.signInWithOAuth(provider);
  }

  /**
   * Register user with credentials
   * @param  {string} email
   * @param  {string} password
   * @returns {Promise<any>}
   */
  public register(email: string, password: string): Promise<any> {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.afs.updateUserData(credential);
      });
  }

  /**
   * Signs user out
   * @returns {Promise<any>}
   */
  public signOut(): Promise<any> {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['home']);
    });
  }

  /**
   * Send a password reset mail
   * @param  {string} email Email
   * @returns {Promise<any>}
   */
  public sendResetPasswordMail(email: string): Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
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
