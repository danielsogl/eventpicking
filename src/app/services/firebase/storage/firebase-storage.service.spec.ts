import { inject, TestBed } from '@angular/core/testing';
import { FirebaseApp } from 'angularfire2';

import { FirebaseStorageService } from './firebase-storage.service';

describe('FirebaseStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseStorageService, FirebaseApp]
    });
  });

  it('should be created', inject([FirebaseStorageService], (service: FirebaseStorageService) => {
    expect(service).toBeTruthy();
  }));
});
