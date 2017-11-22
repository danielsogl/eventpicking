import { browser, by, element } from 'protractor';

export class LoginPage {

  navigateTo() {
    return browser.get('/login');
  }

  getBrowserTitle() {
    return browser.getTitle();
  }

  getPageTitle() {
    return element(by.id('page_title'));
  }

  getEmailInput() {
    return element(by.id('input_email'));
  }

  getPasswordInput() {
    return element(by.id('input_password'));
  }

  getResetPasswordLink() {
    return element(by.id('p_open_reset_modal'));
  }

  getLoginButton() {
    return element(by.id('button_login'));
  }

  getLoginWithFacebookButton() {
    return element(by.id('button_login_with_facebook'));
  }

  getLoginWithTwitterkButton() {
    return element(by.id('button_login_with_twitter'));
  }

  getLoginWithGoogleButton() {
    return element(by.id('button_login_with_google'));
  }

  getSignupLink() {
    return element(by.id('a_signup'));
  }
}
