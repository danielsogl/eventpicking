import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/home');
  }

  getTitle() {
    browser.ignoreSynchronization = true;
    return browser.getTitle();
  }
}
