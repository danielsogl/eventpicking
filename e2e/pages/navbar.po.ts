import { browser, by, element } from 'protractor';

export class Navbar {

  getToogleProfile() {
    return element(by.id('a_toggle_profile'));
  }

  getProfileLink() {
    return element(by.id('a_profile'));
  }

  getSignoutLink() {
    return element(by.id('a_logout'));
  }

}
