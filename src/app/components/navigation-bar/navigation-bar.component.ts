import { Component, OnInit } from '@angular/core';

import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { Log } from 'ng2-logger';

/**
 * Navigation bar component
 * @author Daniel Sogl
 */
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  /** Logger */
  private log = Log.create('NavigationBarComponent');

  /** User */
  public user: any;

  /**
   * Constructor
   * @param  {FirebaseAuthService} auth Firebase Auth Service
   */
  constructor(private auth: FirebaseAuthService) {
    this.auth.user.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  /**
   * Initlaize COmponent
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
  }

  /**
   * Logout user
   */
  logout() {
    this.auth.signOut().then(() => {
      this.user = null;
    });
  }
}
