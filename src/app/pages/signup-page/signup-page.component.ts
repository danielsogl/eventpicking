import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Log } from 'ng2-logger';

import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  private log = Log.create('SignupPageComponent');

  public email: string;
  public password: string;
  public password_repeated: string;
  public photographerUrl: string;
  public photographerUrlAvailable: boolean;

  public template: TemplateRef<any>;

  public error: { name: string; message: string; code: string } = {
    name: '',
    message: '',
    code: ''
  };

  @ViewChild('formUser') formUser: TemplateRef<any>;
  @ViewChild('formPhotographer') formPhotographer: TemplateRef<any>;

  constructor(
    private auth: FirebaseAuthService,
    private afs: FirebaseFirestoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.template = this.formUser;
    this.log.color = 'orange';
    this.log.d('Component initialized');
  }

  switchForms() {
    if (this.template === this.formUser) {
      this.template = this.formPhotographer;
    } else {
      this.template = this.formUser;
    }
  }

  checkphotographerUrl() {
    this.afs
      .checkDisplayname(this.photographerUrl)
      .valueChanges()
      .subscribe(photographerUrl => {
        if (photographerUrl) {
          this.photographerUrlAvailable = false;
        } else {
          this.photographerUrlAvailable = true;
        }
      });
  }

  signupWithCredentials() {
    this.auth
      .register(this.email, this.password)
      .then(() => {
        console.log('Singed in with Email and password');
        this.updateUser();
      })
      .catch(err => {
        this.error = err;
        console.log('error', err);
      });
  }

  loginWithGoogle() {
    this.auth
      .signInWithGoogle()
      .then(() => {
        console.log('Singed in with Google');
        this.updateUser();
      })
      .catch(err => {
        this.error = err;
        console.log('error', err);
      });
  }

  loginWithFacebook() {
    this.auth
      .signInWithFacebook()
      .then(() => {
        console.log('Singed in with Facebook');
        this.updateUser();
      })
      .catch(err => {
        this.error = err;
        console.log('error', err);
      });
  }

  loginWithTwitter() {
    this.auth
      .signInWithTwitter()
      .then(() => {
        console.log('Singed in with twitter');
        this.updateUser();
      })
      .catch(err => {
        this.error = err;
        console.log('error', err);
      });
  }

  updateUser() {
    if (this.template === this.formPhotographer) {
      this.auth.user.subscribe(user => {
        user.roles.photographer = true;
        user.roles.user = false;
        user.photographerUrl = this.photographerUrl;
        user.subscription = { membership: 'free', status: 'valid' };
        user.eventsLeft = 1;
        this.afs.updateUserData(user).then(() => {
          this.router.navigate(['dashboard']);
        });
      });
    } else {
      this.auth.user.subscribe(user => {
        user.subscription = { membership: 'user', status: 'valid' };
        this.afs.updateUserData(user).then(() => {
          this.router.navigate(['dashboard']);
        });
      });
    }
  }
}
