import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { FakeLoader } from '../../../../jest-mocks/fake-loader';
import { PhotographerPageComponent } from './photographer-page.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';
import {
  AngularFirestore,
  AngularFirestoreModule
} from 'angularfire2/firestore';

describe('PhotographerPageComponent', () => {
  let component: PhotographerPageComponent;
  let fixture: ComponentFixture<PhotographerPageComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          AngularFireModule.initializeApp(environment.firebase),
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: FakeLoader }
          })
        ],
        providers: [
          AngularFireAuth,
          FirebaseAuthService,
          FirebaseFirestoreService,
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
