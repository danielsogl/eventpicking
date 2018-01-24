import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreModule
} from 'angularfire2/firestore';
import { MDBBootstrapModules } from 'ng-mdb-pro/mdb.module';

import { FakeLoader } from '../../../../jest-mocks/fake-loader';
import { environment } from '../../../environments/environment';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';
import { FirebaseStorageService } from '../../services/firebase/storage/firebase-storage.service';
import { LoginPageComponent } from './login-page.component';
import { AlertService } from '../../services/alert/alert.service';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          MDBBootstrapModules.forRoot(),
          AngularFireModule.initializeApp(environment.firebase),
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: FakeLoader }
          })
        ],
        providers: [
          FirebaseAuthService,
          AngularFireAuth,
          FirebaseStorageService,
          FirebaseFirestoreService,
          FormBuilder,
          AlertService,
          { provide: AngularFirestore, depends: AngularFirestoreModule }
        ],
        declarations: [LoginPageComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate login form correctly', () => {
    component.loginForm.setValue({
      email: 'user@test.de',
      password: 'password'
    });
    expect(component.loginForm.valid).toBeTruthy();

    component.loginForm.setValue({
      email: '',
      password: ''
    });
    expect(component.loginForm.valid).toBeFalsy();

    component.loginForm.setValue({
      email: 'invalid email',
      password: 'password'
    });
    expect(component.loginForm.valid).toBeFalsy();
  });

  it(
    'should login with credentials',
    inject([FirebaseAuthService], (service: FirebaseAuthService) => {
      component.loginForm.setValue({
        email: 'user@test.de',
        password: 'password'
      });
      component.loginWithCredentials();
      expect(service.getCurrentFirebaseUser()).toBeDefined();
    })
  );

  it('should validate reset password form', () => {
    component.resetPasswordForm.setValue({ email: 'user@test.de' });
    expect(component.resetPasswordForm.valid).toBeTruthy();

    component.resetPasswordForm.setValue({ email: 'invalid email' });
    expect(component.resetPasswordForm.valid).toBeFalsy();
  });

  // it(
  //   'should send reset password mail',
  //   inject([FirebaseAuthService], (service: FirebaseAuthService) => {
  //     component.resetPasswordForm.setValue({ email: 'user@test.de' });
  //     expect(service.sendResetPasswordMail(component.resetPasswordForm.getRawValue().email)).tobe
  //   })
  // );
});
