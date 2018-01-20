import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreModule
} from 'angularfire2/firestore';
import { MDBBootstrapModules } from 'ng-mdb-pro/mdb.module';

import { FakeLoader } from '../../../../jest-mocks/fake-loader';
import { environment } from '../../../environments/environment';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';
import { FirebaseStorageService } from '../../services/firebase/storage/firebase-storage.service';
import { PhotographerPageComponent } from './photographer-page.component';
import { AlertService } from '../../services/alert/alert.service';

describe('PhotographerPageComponent', () => {
  let component: PhotographerPageComponent;
  let fixture: ComponentFixture<PhotographerPageComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          MDBBootstrapModules.forRoot(),
          AngularFireModule.initializeApp(environment.firebase),
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: FakeLoader }
          })
        ],
        providers: [
          FirebaseAuthService,
          AngularFireAuth,
          FirebaseStorageService,
          FirebaseFirestoreService,
          AlertService,
          { provide: AngularFirestore, depends: AngularFirestoreModule }
        ],
        declarations: [PhotographerPageComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
