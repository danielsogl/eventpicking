import { Navbar } from '../pages/navbar.po';
import { browser } from 'protractor';

import { LoginPage } from '../pages/login-page.po';

describe('login e2e test', () => {
  let page: LoginPage;
  let nav: Navbar;

  beforeEach(() => {
    browser.ignoreSynchronization = true;
    page = new LoginPage();
    page.navigateTo();
  });

  it('should login user with email and password', () => {
    page.getEmailInput().sendKeys('daniel@sogls.de');
    page.getPasswordInput().sendKeys('passwort');
    page.getLoginButton().click().then(() => {
      browser.driver.sleep(2000);
      browser.getCurrentUrl().then(url => {
        expect(url).toContain('/profile');
      });
    });
  });
});
