import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { environment } from '../../../../environments/environment';
import { FirebaseAuthService } from '../firebase-auth/firebase-auth.service';
import { RoleGuard } from './role-guard.service';

describe('RoleGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [
        RoleGuard,
        FirebaseAuthService,
        AngularFireAuth,
        AngularFireDatabase
      ]
    });
  });

  it('should be created', inject([RoleGuard], (service: RoleGuard) => {
    expect(service).toBeTruthy();
  }));
});
