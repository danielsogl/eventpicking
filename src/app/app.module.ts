import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MDBBootstrapModules, MDBSpinningPreloader } from 'ng-mdb-pro';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DataProtectionPageComponent } from './pages/data-protection-page/data-protection-page.component';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { FeaturesPageComponent } from './pages/features-page/features-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ImprintPageComponent } from './pages/imprint-page/imprint-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PhotoDetailPageComponent } from './pages/photo-detail-page/photo-detail-page.component';
import { PhotographerPageComponent } from './pages/photographer-page/photographer-page.component';
import { PricesPageComponent } from './pages/prices-page/prices-page.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { AuthGuard } from './services/auth/auth-guard/auth-guard.service';
import { FirebaseAuthService } from './services/auth/firebase-auth/firebase-auth.service';
import { RoleGuard } from './services/auth/role-guard/role-guard.service';
import { FirebaseFirestoreService } from './services/firebase/firestore/firebase-firestore.service';
import { FirebaseStorageService } from './services/firebase/storage/firebase-storage.service';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { DashboardPhotographerComponent } from './components/dashboard-photographer/dashboard-photographer.component';
import { PhotographerSearchPageComponent } from './pages/photographer-search-page/photographer-search-page.component';
import { EventUserComponent } from './components/event-user/event-user.component';
import { EventPhotographerComponent } from './components/event-photographer/event-photographer.component';
import { PictureDetailComponent } from './components/picture-detail/picture-detail.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    EventPageComponent,
    FooterComponent,
    HomePageComponent,
    NavigationBarComponent,
    PageNotFoundComponent,
    DashboardPageComponent,
    CheckoutPageComponent,
    SignupPageComponent,
    LoginPageComponent,
    PhotoDetailPageComponent,
    PhotographerPageComponent,
    PricesPageComponent,
    FeaturesPageComponent,
    ShoppingCartComponent,
    ImprintPageComponent,
    DataProtectionPageComponent,
    DashboardUserComponent,
    DashboardAdminComponent,
    DashboardPhotographerComponent,
    PhotographerSearchPageComponent,
    EventUserComponent,
    EventPhotographerComponent,
    PictureDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MDBBootstrapModules.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AuthGuard,
    FirebaseAuthService,
    FirebaseFirestoreService,
    FirebaseStorageService,
    MDBSpinningPreloader,
    RoleGuard
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
