import { TestBed, inject } from '@angular/core/testing';

import { FirebaseDatabaseService } from './firebase-database.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../../../environments/environment.prod';

describe('FirebaseDatabaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase)],
      providers: [FirebaseDatabaseService, AngularFireDatabase]
    });
  });

  it('should be created', inject([FirebaseDatabaseService], (service: FirebaseDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
