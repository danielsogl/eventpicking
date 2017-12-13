import { Component, OnInit } from '@angular/core';

import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { Log } from 'ng2-logger';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  private log = Log.create('NavigationBarComponent');

  public user: any;

  constructor(private auth: FirebaseAuthService) {
    this.auth.getAuthState().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {}

  logout() {
    this.auth.signOut();
  }
}
