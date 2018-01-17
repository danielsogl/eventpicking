import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSearchPageComponent } from './event-search-page.component';
import { MDBBootstrapModules } from 'ng-mdb-pro/mdb.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../../environments/environment';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FakeLoader } from '../../../../jest-mocks/fake-loader';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';
import {
  AngularFirestore,
  AngularFirestoreModule
} from 'angularfire2/firestore';

describe('EventSearchPageComponent', () => {
  let component: EventSearchPageComponent;
  let fixture: ComponentFixture<EventSearchPageComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MDBBootstrapModules.forRoot(),
          RouterTestingModule,
          AngularFireModule.initializeApp(environment.firebase),
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: FakeLoader }
          })
        ],
        providers: [
          FirebaseFirestoreService,
          { provide: AngularFirestore, depends: AngularFirestoreModule }
        ],
        declarations: [EventSearchPageComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
