import { WeerPage } from './app.po';

describe('weer App', () => {
  let page: WeerPage;

  beforeEach(() => {
    page = new WeerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
