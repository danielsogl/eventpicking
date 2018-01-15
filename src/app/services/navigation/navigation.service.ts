import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Log } from 'ng2-logger';

/**
 * Navigation service
 * @author Danile Sogl
 */
@Injectable()
export class NavigationService {
  /** Logger */
  private log = Log.create('NavigationService');

  /**
   * Constructor
   * @param  {Router} router Router
   */
  constructor(private router: Router) {}

  /**
   * Navigate to route
   * @param  {string} path Path
   */
  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
