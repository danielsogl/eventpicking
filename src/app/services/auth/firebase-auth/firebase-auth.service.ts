import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * EIn Service für die Authentifizierung mit den Firebase Services
 * @author Daniel Sogl
 */
@Injectable()
export class FirebaseAuthService {

  /**
   * @param  {AngularFireAuth} auth AngularFire Auth
   */
  constructor(private auth: AngularFireAuth) { }

}
