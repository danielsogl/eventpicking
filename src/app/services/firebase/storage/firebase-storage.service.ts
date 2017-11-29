import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { Log } from 'ng2-logger';

/**
 * Ein Service für die Kommunikation mit dem Firebase Storage Service
 * @author Daniel Sogl
 */
@Injectable()
export class FirebaseStorageService {
  private log = Log.create('FirebaseStorageService');

  /**
   * @param  {FirebaseApp} fbApp AngularFire Firebase App
   */
  constructor(private fbApp: FirebaseApp) {
    this.log.color = 'green';
    this.log.d('Service injected');
  }
}
