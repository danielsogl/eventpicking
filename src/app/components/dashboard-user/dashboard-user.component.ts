import { Component, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';

import { User } from '../../classes/user';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';

/**
 * User dashboard component
 * @author Daniel Sogl
 */
@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {
  /** Logger */
  private log = Log.create('DashboardUserComponent');
  /** Firebase user */
  public user: User;

  constructor(
    private auth: FirebaseAuthService,
    private afs: FirebaseFirestoreService
  ) {}

  /**
   * Initialize component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    this.auth.user.subscribe(user => {
      this.user = user;
      this.log.d('Loaded user', user);
    });
  }
}
