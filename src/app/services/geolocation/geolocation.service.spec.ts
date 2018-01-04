import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { GeolocationService } from './geolocation.service';

describe('GeolocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeolocationService, HttpClient],
      imports: [HttpClientModule, HttpClientTestingModule]
    });
  });

  it(
    'should be created',
    inject([GeolocationService], (service: GeolocationService) => {
      expect(service).toBeTruthy();
    })
  );
});
