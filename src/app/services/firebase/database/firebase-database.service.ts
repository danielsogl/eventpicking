import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Ein Service für die Kommunikation mit der Firebase Datenbank
 * @author Daniel Sogl
 */
@Injectable()
export class FirebaseDatabaseService {

  /**
   * @param  {AngularFireDatabase} db AngularFire Datenbank
   */
  constructor(private db: AngularFireDatabase) { }

}
