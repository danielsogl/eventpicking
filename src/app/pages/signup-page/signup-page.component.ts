import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  public email: string;
  public password: string;
  public password_repeated: string;

  public template: TemplateRef<any>;

  @ViewChild('formUser') formUser: TemplateRef<any>;
  @ViewChild('formPhotographer') formPhotographer: TemplateRef<any>;

  constructor(private auth: FirebaseAuthService, private router: Router) { }

  ngOnInit() {
    this.template = this.formUser;
  }

  switchForms() {
    if (this.template === this.formUser) {
      this.template = this.formPhotographer;
    } else {
      this.template = this.formUser;
    }
  }

  signupWithCredentials() {
    this.auth.register(this.email, this.password).then(() => {
      console.log('Singed in with Email and password');
      this.updateUser();
    }).catch(err => {
      console.log('error', err);
    });
  }

  loginWithGoogle() {
    this.auth.signInWithGoogle().then(() => {
      console.log('Singed in with Google');
      this.updateUser();
    }).catch(err => {
      console.log('error', err);
    });
  }

  loginWithFacebook() {
    this.auth.signInWithFacebook().then(() => {
      console.log('Singed in with Facebook');
      this.updateUser();
    }).catch(err => {
      console.log('error', err);
    });
  }

  loginWithTwitter() {
    this.auth.signInWithTwitter().then(() => {
      console.log('Singed in with twitter');
      this.updateUser();
    }).catch(err => {
      console.log('error', err);
    });
  }

  updateUser() {
    if (this.template === this.formPhotographer) {
      this.auth.user.subscribe(user => {
        user.roles.photographer = true;
        user.roles.user = false;
        this.auth.updateUserData(user).then(() => {
          this.router.navigate(['profile']);
        });
      });
    } else {
      this.router.navigate(['profile']);
    }
  }

}
