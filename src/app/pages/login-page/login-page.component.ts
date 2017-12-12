import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Log } from 'ng2-logger';

import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';

/**
 * Login page component
 * @author Daniel Sogl
 */
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  /**
   * Logger
   */
  private log = Log.create('LoginPageComponent');

  /**
   * Login form group
   */
  public loginForm: FormGroup;
  /**
   * reset password form group
   */
  public resetPasswordForm: FormGroup;

  /**
   * Firebase error
   */
  public error: { name: string; message: string; code: string } = {
    name: null,
    message: null,
    code: null
  };

  /**
   * Constructor
   * @param  {FirebaseAuthService} auth FirebaseAuthService
   * @param  {Router} router Router
   * @param  {FormBuilder} formBuilder FormBuilder
   */
  constructor(
    private auth: FirebaseAuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  /**
   * Initialise component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    // Init login form
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });

    // Init reset password form
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', Validators.email]
    });
  }

  /**
   * Login with credentials
   */
  loginWithCredentials() {
    if (this.loginForm.valid) {
      this.auth
        .signInWithEmail(
          this.loginForm.value.email,
          this.loginForm.value.password
        )
        .then(() => {
          this.log.d('Singed in with Email and password');
          this.router.navigate(['dashboard']);
        })
        .catch(err => {
          this.error = err;
          this.log.er('error', err);
        });
    }
  }

  /**
   * Login with Google
   */
  loginWithGoogle() {
    this.auth
      .signInWithGoogle()
      .then(() => {
        this.log.d('Singed in with Google');
        this.router.navigate(['dashboard']);
      })
      .catch(err => {
        this.error = err;
        this.log.er('error', err);
      });
  }

  /**
   * Login with Facebook
   */
  loginWithFacebook() {
    this.auth
      .signInWithFacebook()
      .then(() => {
        this.log.d('Singed in with Facebook');
        this.router.navigate(['dashboard']);
      })
      .catch(err => {
        this.error = err;
        this.log.er('error', err);
      });
  }

  /**
   * Login with Twitter
   */
  loginWithTwitter() {
    this.auth
      .signInWithTwitter()
      .then(() => {
        this.log.d('Singed in with twitter');
        this.router.navigate(['dashboard']);
      })
      .catch(err => {
        this.error = err;
        this.log.er('error', err);
      });
  }

  /**
   * Reset user password
   */
  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.auth
        .sendResetPasswordMail(this.resetPasswordForm.value.email)
        .then(() => {
          this.log.d('Password reset mail sended');
        })
        .catch(err => {
          this.log.er('Error sending reset mail', err);
        });
    }
  }
}
