import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppRoutingModule } from 'app/app-routing.module';
import { FooterComponent } from 'app/components/footer/footer.component';
import { NavigationBarComponent } from 'app/components/navigation-bar/navigation-bar.component';
import { CheckoutPageComponent } from 'app/pages/checkout-page/checkout-page.component';
import { EventPageComponent } from 'app/pages/event-page/event-page.component';
import { HomePageComponent } from 'app/pages/home-page/home-page.component';
import { LoginPageComponent } from 'app/pages/login-page/login-page.component';
import { PageNotFoundComponent } from 'app/pages/page-not-found/page-not-found.component';
import { PhotoDetailPageComponent } from 'app/pages/photo-detail-page/photo-detail-page.component';
import { PhotographerPageComponent } from 'app/pages/photographer-page/photographer-page.component';
import { PricesPageComponent } from 'app/pages/prices-page/prices-page.component';
import { ProfilePageComponent } from 'app/pages/profile-page/profile-page.component';
import { SignupPageComponent } from 'app/pages/signup-page/signup-page.component';
import { environment } from 'environments/environment';

import { AppComponent } from './app.component';
import { AuthGuard } from './services/auth/auth-guard/auth-guard.service';
import { FirebaseAuthService } from './services/auth/firebase-auth/firebase-auth.service';
import { RoleGuard } from './services/auth/role-guard/role-guard.service';
import { FirebaseFirestoreService } from './services/firebase/firestore/firebase-firestore.service';
import { FirebaseStorageService } from './services/firebase/storage/firebase-storage.service';
import { MDBBootstrapModule } from './typescripts/free';
import { ToastModule } from './typescripts/pro/alerts/toast/toast.module';
import { MDBBootstrapModulePro } from './typescripts/pro/index';
import { MDBSpinningPreloader } from './typescripts/pro/index';

@NgModule({
  declarations: [
    AppComponent,
    EventPageComponent,
    FooterComponent,
    HomePageComponent,
    NavigationBarComponent,
    PageNotFoundComponent,
    ProfilePageComponent,
    CheckoutPageComponent,
    SignupPageComponent,
    LoginPageComponent,
    PhotoDetailPageComponent,
    PhotographerPageComponent,
    PricesPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MDBBootstrapModule.forRoot(),
    ToastModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    MDBBootstrapModulePro.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [
    MDBSpinningPreloader,
    AuthGuard,
    FirebaseAuthService,
    FirebaseFirestoreService,
    FirebaseStorageService,
    RoleGuard
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
