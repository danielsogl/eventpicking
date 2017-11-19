import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { User } from '../../../classes/user';

/**
 * A service to authenticate with the firebase services
 * @author Daniel Sogl
 */
@Injectable()
export class FirebaseAuthService {

  /**
   * firebse user
   */
  user: BehaviorSubject<User> = new BehaviorSubject(null);

  /**
   * @param  {AngularFireAuth} afAuth AngularFire Auth
   * @param  {AngularFireDatabase} db AngularFire Auth
   */
  constructor(private afAuth: AngularFireAuth,  private db: AngularFireDatabase) {
    this.afAuth.authState.switchMap(auth => {
      if (auth) {
        // user is signed in
        return this.db.object('users/' + auth.uid).valueChanges();
      } else {
        // user is not signed in
        return Observable.of(null);
      }
    }).subscribe(user => {
      this.user.next(user);
    });
  }

  /**
   * Signs the user in
   * @param  {string} email user e-mail
   * @param  {string} password user password
   * @returns {Promise<any>}
   */
  signIn(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(credential => {
      this.updateUser(credential.user);
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

  /**
   * Updates the users data in the firebase db
   * @param  {any} authData Firebase auth data
   * @returns {void}
   */
  private updateUser(authData: any): void {
    const userData = new User(authData);
    const ref = this.db.object('users/' + authData.uid);
    ref.valueChanges().take(1).subscribe((user: User) => {
        if (!user.roles) {
          ref.update(userData);
        }
    });
  }

}
