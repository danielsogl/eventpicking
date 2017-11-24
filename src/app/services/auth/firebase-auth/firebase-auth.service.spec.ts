import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../../../../environments/environment';
import { FirebaseAuthService } from './firebase-auth.service';

describe('FirebaseAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [
        FirebaseAuthService,
        AngularFireAuth,
        { provide: AngularFirestore, depends: AngularFirestoreModule }
      ]
    });
  });

  it('should be created', inject([FirebaseAuthService], (service: FirebaseAuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should login user', inject([FirebaseAuthService], (service: FirebaseAuthService) => {
    service.signInWithEmail('daniel@sogls.de', 'passwort').then(() => {
      expect(service.getCurrentFirebaseUser).toBeDefined().then(() => {
        service.signOut();
      });
    });
  }));

  it('should logout user', inject([FirebaseAuthService], (service: FirebaseAuthService) => {
    service.signInWithEmail('daniel@sogls.de', 'passwort').then(() => {
        service.signOut().then(() => {
          expect(service.getCurrentFirebaseUser()).toBeUndefined();
        });
    });
  }));
});
