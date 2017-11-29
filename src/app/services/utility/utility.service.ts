import { Injectable } from '@angular/core';
import { Log } from 'ng2-logger';

/**
 * Some utility functions in one service
 * @author Daniel Sogl
 */
@Injectable()
export class UtilityService {
  private log = Log.create('UtilityService');

  constructor() {
    this.log.color = 'green';
    this.log.d('Service injected');
  }
}
