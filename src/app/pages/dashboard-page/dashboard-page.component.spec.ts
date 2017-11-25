import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../../../environments/environment';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { MDBBootstrapModule } from '../../typescripts/free/index';
import { MDBBootstrapModulePro } from '../../typescripts/pro/index';
import { DashboardPageComponent } from './dashboard-page.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent;
  let fixture: ComponentFixture<DashboardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule,
        NoopAnimationsModule,
        MDBBootstrapModule.forRoot(),
        MDBBootstrapModulePro.forRoot(),
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [
        FirebaseAuthService,
        AngularFireAuth,
        { provide: AngularFirestore, depends: AngularFirestoreModule }
      ],
      declarations: [ DashboardPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
