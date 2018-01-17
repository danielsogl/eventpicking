import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MDBBootstrapModules } from 'ng-mdb-pro/mdb.module';

import { FakeLoader } from '../../../../jest-mocks/fake-loader';
import { CheckoutPageComponent } from './checkout-page.component';
import {
  AsyncLocalStorage,
  AsyncLocalStorageModule
} from 'angular-async-local-storage';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestoreModule,
  AngularFirestore
} from 'angularfire2/firestore';
import { FirebaseStorageService } from '../../services/firebase/storage/firebase-storage.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { environment } from '../../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { RouterTestingModule } from '@angular/router/testing';

describe('CheckoutPageComponent', () => {
  let component: CheckoutPageComponent;
  let fixture: ComponentFixture<CheckoutPageComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          AsyncLocalStorageModule,
          MDBBootstrapModules.forRoot(),
          AngularFireModule.initializeApp(environment.firebase),
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: FakeLoader }
          })
        ],
        providers: [
          FirebaseAuthService,
          FirebaseFirestoreService,
          AngularFireAuth,
          AngularFireStorage,
          FirebaseStorageService,
          AsyncLocalStorage,
          { provide: AngularFirestore, depends: AngularFirestoreModule }
        ],
        declarations: [CheckoutPageComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
