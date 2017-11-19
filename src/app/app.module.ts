import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

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
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { AuthGuard } from './services/auth/auth-guard/auth-guard.service';
import { FirebaseAuthService } from './services/auth/firebase-auth/firebase-auth.service';
import { RoleGuard } from './services/auth/role-guard/role-guard.service';
import { FirebaseDatabaseService } from './services/firebase/database/firebase-database.service';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [
    AuthGuard,
    FirebaseAuthService,
    FirebaseDatabaseService,
    FirebaseStorageService,
    RoleGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
