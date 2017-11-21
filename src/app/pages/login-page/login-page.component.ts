import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public email: string;
  public emailReset: string;
  public password: string;

  constructor(private auth: FirebaseAuthService, private router: Router) { }

  ngOnInit() {
  }

  loginWithCredentials() {
    this.auth.signInWithEmail(this.email, this.password).then(() => {
      console.log('Singed in with Email and password');
      this.router.navigate(['profile']);
    }).catch(err => {
      console.log('error', err);
    });
  }

  loginWithGoogle() {
    this.auth.signInWithGoogle().then(() => {
      console.log('Singed in with Google');
      this.router.navigate(['profile']);
    }).catch(err => {
      console.log('error', err);
    });
  }

  loginWithFacebook() {
    this.auth.signInWithFacebook().then(() => {
      console.log('Singed in with Facebook');
      this.router.navigate(['profile']);
    }).catch(err => {
      console.log('error', err);
    });
  }

  loginWithTwitter() {
    this.auth.signInWithTwitter().then(() => {
      console.log('Singed in with twitter');
      this.router.navigate(['profile']);
    }).catch(err => {
      console.log('error', err);
    });
  }

  resetPassword() {
    this.auth.sendResetPasswordMail(this.emailReset);
  }

}
