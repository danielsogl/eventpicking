import { browser, by, element } from 'protractor';

export class Navbar {

  getLogoLink() {
    return element(by.id('a_logo'));
  }

  getHomeLink() {
    return element(by.id('a_home'));
  }

  getFeaturesLink() {
    return element(by.id('a_features'));
  }

  getPricesLink() {
    return element(by.id('a_prices'));
  }

  getSignupLink() {
    return element(by.id('a_signup'));
  }

  getLoginLink() {
    return element(by.id('a_login'));
  }

  getDashboardLink() {
    return element(by.id('a_dashboard'));
  }

  getLogoutLink() {
    return element(by.id('a_logout'));
  }

}
