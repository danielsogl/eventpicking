import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PhotoDetailPageComponent } from './pages/photo-detail-page/photo-detail-page.component';
import { PhotographerPageComponent } from './pages/photographer-page/photographer-page.component';
import { PricesPageComponent } from './pages/prices-page/prices-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { AuthGuard } from './services/auth/auth-guard/auth-guard.service';
import { FirebaseAuthService } from './services/auth/firebase-auth/firebase-auth.service';
import { RoleGuard } from './services/auth/role-guard/role-guard.service';
import { FirebaseFirestoreService } from './services/firebase/firestore/firebase-firestore.service';
import { FirebaseStorageService } from './services/firebase/storage/firebase-storage.service';



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
    PricesPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    AuthGuard,
    FirebaseAuthService,
    FirebaseFirestoreService,
    FirebaseStorageService,
    RoleGuard,
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
