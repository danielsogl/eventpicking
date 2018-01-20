import { inject, TestBed } from '@angular/core/testing';
import { ToastModule, ToastService } from 'ng-mdb-pro/pro/alerts';

import { AlertService } from './alert.service';

describe('AlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastModule.forRoot()],
      providers: [AlertService, ToastService]
    });
  });

  it(
    'should be created',
    inject([AlertService], (service: AlertService) => {
      expect(service).toBeTruthy();
    })
  );
});
