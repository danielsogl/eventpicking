import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { FirebaseAuthService } from './services/auth/firebase-auth/firebase-auth.service';
import { MDBSpinningPreloader } from './typescripts/pro/preloader/preloader.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      declarations: [
        AppComponent,
        NavigationBarComponent,
        FooterComponent
      ],
      providers: [
        FirebaseAuthService,
        AngularFireAuth,
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
