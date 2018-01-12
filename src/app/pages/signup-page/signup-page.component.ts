import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Log } from 'ng2-logger';

import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';

/**
 * Signup page component
 * @author Daniel Sogl
 */
@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  /** Logger */
  private log = Log.create('SignupPageComponent');

  /** available photographer url */
  public photographerUrlAvailable: boolean;
  /** signup form */
  public signupForm: FormGroup;
  /** template ref */
  public template: TemplateRef<any>;
  /** firebase error */
  public error: { name: string; message: string; code: string } = {
    name: '',
    message: '',
    code: ''
  };

  /** signup as user form ref */
  @ViewChild('formUser') formUser: TemplateRef<any>;
  /** signup as photographer form ref */
  @ViewChild('formPhotographer') formPhotographer: TemplateRef<any>;

  /**
   * Constructor
   * @param {FirebaseAuthService} auth FirebaseAuthService
   * @param {FirebaseFirestoreService} afs FirebaseFirestoreService
   * @param {Router} router Router
   * @param {FormBuilder} formBuilder FormBuilder
   */
  constructor(
    private auth: FirebaseAuthService,
    private afs: FirebaseFirestoreService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    // Signup form
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.email],
      photographerUrl: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  /** Initi component */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    this.template = this.formUser;
  }

  /** Switch between signup forms */
  switchForms() {
    this.signupForm.clearValidators();
    if (this.template === this.formUser) {
      this.template = this.formPhotographer;
    } else {
      this.template = this.formUser;
    }
  }

  /** check if photographer url is already taken */
  checkphotographerUrl() {
    if (this.signupForm.value.photographerUrl) {
      this.afs
        .checkDisplayname(this.signupForm.value.photographerUrl)
        .valueChanges()
        .subscribe(photographerUrl => {
          if (photographerUrl) {
            this.log.er(
              `The URL ${
                this.signupForm.value.photographerUrl
              } is not available`
            );
            this.photographerUrlAvailable = false;
          } else {
            this.log.d(
              `The URL ${this.signupForm.value.photographerUrl} is available`
            );
            this.photographerUrlAvailable = true;
          }
        });
    }
  }

  /** Signup with credentials */
  signupWithCredentials() {
    if (this.signupForm.valid) {
      this.auth
        .register(this.signupForm.value.email, this.signupForm.value.password)
        .then(() => {
          this.log.d('Singed in with Email and password');
          this.updateUser();
        })
        .catch(err => {
          this.error = err;
          this.log.er('error', err);
        });
    }
  }

  /** Signup with Google */
  loginWithGoogle() {
    this.auth
      .signInWithGoogle()
      .then(() => {
        this.log.d('Singed in with Google');
        this.updateUser();
      })
      .catch(err => {
        this.error = err;
        this.log.er('error', err);
      });
  }

  /** Signup with Facebook */
  loginWithFacebook() {
    this.auth
      .signInWithFacebook()
      .then(() => {
        this.log.d('Singed in with Facebook');
        this.updateUser();
      })
      .catch(err => {
        this.error = err;
        this.log.er('error', err);
      });
  }

  /** Signup with Twitter */
  loginWithTwitter() {
    this.auth
      .signInWithTwitter()
      .then(() => {
        this.log.d('Singed in with twitter');
        this.updateUser();
      })
      .catch(err => {
        this.error = err;
        this.log.er('error', err);
      });
  }

  /** Update user in firestore */
  updateUser() {
    if (this.template === this.formPhotographer) {
      this.auth.user.subscribe(user => {
        user.roles = {
          photographer: true,
          user: false,
          admin: false
        };
        user.photographerUrl = this.signupForm.value.photographerUrl;
        user.subscription = {
          membership: 'free',
          status: 'valid',
          premium: false
        };
        this.afs.getPhotographerProfile(user.uid).set({
          about: '',
          email: user.email,
          facebook: '',
          instagram: '',
          name: '',
          phone: '',
          tumbler: '',
          twitter: '',
          uid: user.uid,
          website: '',
          photoUrl: user.photoUrl,
          profileUrl: user.photographerUrl,
          premium: false,
          location: {
            lat: 0,
            lng: 0
          }
        });
        this.afs.updateUserData(user).then(() => {
          this.router.navigate(['dashboard']);
        });
      });
    } else {
      this.auth.user.subscribe(user => {
        user.subscription = {
          membership: 'user',
          status: 'valid',
          premium: false
        };
        this.afs.updateUserData(user).then(() => {
          this.router.navigate(['dashboard']);
        });
      });
    }
  }
}
