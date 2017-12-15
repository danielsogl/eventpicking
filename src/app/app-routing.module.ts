import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { PhotographerSearchPageComponent } from './pages/photographer-search-page/photographer-search-page.component';
import { PricesPageComponent } from './pages/prices-page/prices-page.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { AuthGuard } from './services/auth/auth-guard/auth-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '404', component: PageNotFoundComponent },
  {
    path: 'check-out',
    component: CheckoutPageComponent,
    canActivate: [AuthGuard]
  },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'data-protection', component: DataProtectionPageComponent },
  { path: 'event/:id', component: EventPageComponent },
  { path: 'features', component: FeaturesPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'imprint', component: ImprintPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'prices', component: PricesPageComponent },
  { path: 'photo/:id', component: PhotoDetailPageComponent },
  {
    path: 'photographer/:photographerUrl',
    component: PhotographerPageComponent
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [AuthGuard]
  },
  { path: 'search', component: PhotographerSearchPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
