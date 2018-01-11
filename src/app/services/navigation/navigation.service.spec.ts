import { TestBed, inject } from '@angular/core/testing';

import { NavigationService } from './navigation.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavigationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [NavigationService]
    });
  });

  it(
    'should be created',
    inject([NavigationService], (service: NavigationService) => {
      expect(service).toBeTruthy();
    })
  );
});
