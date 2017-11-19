import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '404', component: PageNotFoundComponent },
  { path: 'check-out', component: CheckoutPageComponent },
  { path: 'event/:id', component: EventPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'photo/:id', component: PhotoDetailPageComponent },
  { path: 'photographer/:id', component: PhotographerPageComponent },
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupPageComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
