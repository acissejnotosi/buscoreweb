import { BusCoreWebPage } from './app.po';

describe('bus-core-web App', () => {
  let page: BusCoreWebPage;

  beforeEach(() => {
    page = new BusCoreWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
