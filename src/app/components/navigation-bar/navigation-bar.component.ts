import { Component, OnInit } from '@angular/core';

import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  public fbUser: any;

  constructor(private auth: FirebaseAuthService) {
    this.auth.getAuthState().subscribe(user => {
      this.fbUser = user;
    });
  }

  ngOnInit() {
  }

  login() {
    this.auth.signIn('daniel@sogls.de', 'passwort');
  }

  logout() {
    this.auth.signOut();
  }

}
