import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private auth: FirebaseAuthService, private router: Router) { }

  ngOnInit() {
  }

  loginWithCredentials(email: string, password: string) {
    this.auth.signInWithEmail(email, password).then(value => {
      console.log('Singed in with Google', value);
      this.router.navigate(['profile']);
    }).catch(err => {
      console.log('error', err);
    });
  }

  loginWithGoogle() {
    this.auth.signInWithGoogle().then(value => {
      console.log('Singed in with Google', value);
      this.router.navigate(['profile']);
    }).catch(err => {
      console.log('error', err);
    });
  }

  loginWithFacebook() {
    this.auth.signInWithFacebook().then(value => {
      console.log('Singed in with Google', value);
      this.router.navigate(['profile']);
    }).catch(err => {
      console.log('error', err);
    });
  }

  loginWithTwitter() {
    this.auth.signInWithTwitter().then(value => {
      console.log('Singed in with Google', value);
      this.router.navigate(['profile']);
    }).catch(err => {
      console.log('error', err);
    });
  }

}
