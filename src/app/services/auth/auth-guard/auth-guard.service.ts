import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { FirebaseAuthService } from '../firebase-auth/firebase-auth.service';

/**
 * Prüft ob ein Nutzer angemeldet ist
 * @author Daniel Sogl
 */
@Injectable()
export class AuthGuard implements CanActivate {

  /**
   * @param  {FirebaseAuthService} auth Firebase Auth Service
   * @param  {Router} router Angular Router
   */
  constructor(public auth: FirebaseAuthService, public router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.auth.getCurrentFirebaseUser();
    if (user) {
      return true;
    } else {
      console.log('User is not authenticated');
      this.router.navigate(['login']);
      return false;
    }
  }

}
