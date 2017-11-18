import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';

/**
 * Ein Service für die Kommunikation mit dem Firebase Storage Service
 * @author Daniel Sogl
 */
@Injectable()
export class FirebaseStorageService {

  /**
   * @param  {FirebaseApp} fbApp AngularFire Firebase App
   */
  constructor(private fbApp: FirebaseApp) { }

}
