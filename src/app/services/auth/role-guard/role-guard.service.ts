import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Log } from 'ng2-logger';

import { FirebaseAuthService } from '../firebase-auth/firebase-auth.service';

/**
 * Authguard for user roles
 * @author Daniel Sogl
 */
@Injectable()
export class RoleGuard implements CanActivate {
  /** Logger */
  private log = Log.create('RoleGuard');

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
   * @param  {ActivatedRouteSnapshot} route
   * @returns {boolean}
   */
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.role;
    const fbUser = this.auth.getCurrentFirebaseUser();

    if (fbUser && this.auth.matchingRole(expectedRole)) {
      return true;
    } else {
      return false;
    }
  }
}
