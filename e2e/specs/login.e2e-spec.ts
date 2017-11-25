import { browser } from 'protractor';

import { LoginPage } from '../pages/login-page.po';

describe('login e2e test', () => {
  let page: LoginPage;
  beforeEach(() => {
    browser.ignoreSynchronization = true;
    page = new LoginPage();
    page.navigateTo();
  });

  it('should login user with email and password', () => {
    page.getEmailInput().sendKeys('user@test.de');
    page.getPasswordInput().sendKeys('passwort');
    page.getLoginButton().click().then(() => {
      browser.driver.sleep(5000);
      browser.getCurrentUrl().then(url => {
        expect(url).toContain('/dashboard');
      });
    });
  });

  it('should login photographer with email and password', () => {
    page.getEmailInput().sendKeys('fotograf@test.de');
    page.getPasswordInput().sendKeys('passwort');
    page.getLoginButton().click().then(() => {
      browser.driver.sleep(5000);
      browser.getCurrentUrl().then(url => {
        expect(url).toContain('/dashboard');
      });
    });
  });

  it('should login admin with email and password', () => {
    page.getEmailInput().sendKeys('admin@test.de');
    page.getPasswordInput().sendKeys('passwort');
    page.getLoginButton().click().then(() => {
      browser.driver.sleep(5000);
      browser.getCurrentUrl().then(url => {
        expect(url).toContain('/dashboard');
      });
    });
  });
});
