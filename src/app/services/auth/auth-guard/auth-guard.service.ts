import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Log } from 'ng2-logger';

import { FirebaseAuthService } from '../firebase-auth/firebase-auth.service';

/**
 * Auth Guard for Firebase Authentication State
 * @author Daniel Sogl
 */
@Injectable()
export class AuthGuard implements CanActivate {
  /** Logger */
  private log = Log.create('AuthGuard');

  /**
   * Constructor
   * @param  {FirebaseAuthService} auth Firebase Auth Service
   * @param  {Router} router Angular Router
   */
  constructor(public auth: FirebaseAuthService, public router: Router) {
    this.log.color = 'green';
    this.log.d('Service injected');
  }

  /**
   * Check if user is allowed to visit route
   * @param  {ActivatedRouteSnapshot} next ActivatedRouteSnapshot
   * @param  {RouterStateSnapshot} state RouterStateSnapshot
   * @returns {boolean}
   */
  canActivate(next: ActivatedRouteSnapshot): boolean {
    const user = this.auth.getCurrentFirebaseUser();

    if (user) {
      this.log.d(`User can navigate to ${next.url.toString()}`);
      return true;
    } else {
      this.log.er(`User can not navigate to ${next.url.toString()}`);
      this.router.navigate(['login']);
      return false;
    }
  }
}
