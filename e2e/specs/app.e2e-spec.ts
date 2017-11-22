import { browser } from 'protractor';

import { AppPage } from '../pages/app.po';

describe('dhbw-projekt-app App', () => {
  let page: AppPage;

  beforeEach(() => {
    browser.ignoreSynchronization = true;
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Eventpicking');
  });
});
