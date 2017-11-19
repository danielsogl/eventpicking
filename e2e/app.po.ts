import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/home');
  }

  getTitle() {
    return browser.getTitle();
  }
}
