import { inject, TestBed } from '@angular/core/testing';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { environment } from '../../../../environments/environment.prod';
import { FirebaseAuthService } from './firebase-auth.service';

describe('FirebaseAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase)],
      providers: [FirebaseAuthService, AngularFireAuth, AngularFireDatabase]
    });
  });

  it('should be created', inject([FirebaseAuthService], (service: FirebaseAuthService) => {
    expect(service).toBeTruthy();
  }));
});
