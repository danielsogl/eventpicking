import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { FirebaseAuthService } from '../firebase-auth/firebase-auth.service';
import { Log } from 'ng2-logger';

/**
 * Auth Guard for Firebase Authentication State
 * @author Daniel Sogl
 */
@Injectable()
export class AuthGuard implements CanActivate {
  private log = Log.create('AuthGuard');

  /**
   * @param  {FirebaseAuthService} auth Firebase Auth Service
   * @param  {Router} router Angular Router
   */
  constructor(public auth: FirebaseAuthService, public router: Router) {
    this.log.color = 'green';
    this.log.d('Service injected');
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
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
