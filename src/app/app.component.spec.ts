import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { MDBBootstrapModules, MDBSpinningPreloader } from 'ng-mdb-pro';

import { FakeLoader } from '../../jest-mocks/fake-loader';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { FirebaseAuthService } from './services/auth/firebase-auth/firebase-auth.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader},
        })
      ],
      declarations: [
        AppComponent,
        NavigationBarComponent,
        MDBBootstrapModules.forRoot(),
        FooterComponent
      ],
      providers: [
        FirebaseAuthService,
        AngularFireAuth,
        ,
        TranslateService,
        MDBSpinningPreloader,
        { provide: AngularFirestore, depends: AngularFirestoreModule }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
