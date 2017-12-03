import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
import { FirebaseErrorPipe } from '../../pipes/firebase-error/firebase-error.pipe';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';
import { FirebaseStorageService } from '../../services/firebase/storage/firebase-storage.service';
import { LoginPageComponent } from './login-page.component';

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
          { provide: AngularFirestore, depends: AngularFirestoreModule }
        ],
        declarations: [LoginPageComponent, FirebaseErrorPipe],
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
});
