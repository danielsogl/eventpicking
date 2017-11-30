import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreModule
} from 'angularfire2/firestore';

import { environment } from '../../../../environments/environment';
import { FirebaseFirestoreService } from '../../firebase/firestore/firebase-firestore.service';
import { FirebaseAuthService } from '../firebase-auth/firebase-auth.service';
import { AuthGuard } from './auth-guard.service';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [
        AuthGuard,
        AngularFireAuth,
        FirebaseAuthService,
        FirebaseFirestoreService,
        { provide: AngularFirestore, depends: AngularFirestoreModule }
      ]
    });
  });

  it(
    'should be created',
    inject([AuthGuard], (service: AuthGuard) => {
      expect(service).toBeTruthy();
    })
  );
});
