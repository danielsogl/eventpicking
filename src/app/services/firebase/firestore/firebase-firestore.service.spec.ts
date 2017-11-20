import { inject, TestBed } from '@angular/core/testing';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../../../../environments/environment.prod';
import { FirebaseFirestoreService } from './firebase-firestore.service';

describe('FirebaseDatabaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase)],
      providers: [
        FirebaseFirestoreService,
        { provide: AngularFirestore, depends: AngularFirestoreModule }
        ]
    });
  });

  it('should be created', inject([FirebaseFirestoreService], (service: FirebaseFirestoreService) => {
    expect(service).toBeTruthy();
  }));
});
