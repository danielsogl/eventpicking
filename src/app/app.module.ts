import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseAuthService } from './services/auth/firebase-auth/firebase-auth.service';
import { FirebaseDatabaseService } from './services/firebase/database/firebase-database.service';
import { FirebaseStorageService } from './services/firebase/storage/firebase-storage.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [
    FirebaseAuthService,
    FirebaseDatabaseService,
    FirebaseStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
