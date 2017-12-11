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

import { FakeLoader } from '../../../../jest-mocks/fake-loader';
import { environment } from '../../../environments/environment';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';
import { SignupPageComponent } from './signup-page.component';

describe('SignupPageComponent', () => {
  let component: SignupPageComponent;
  let fixture: ComponentFixture<SignupPageComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          AngularFireModule.initializeApp(environment.firebase),
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: FakeLoader }
          })
        ],
        providers: [
          FirebaseAuthService,
          AngularFireAuth,
          FirebaseFirestoreService,
          { provide: AngularFirestore, depends: AngularFirestoreModule }
        ],
        declarations: [SignupPageComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
