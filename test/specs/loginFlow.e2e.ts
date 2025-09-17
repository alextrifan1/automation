import LoginPage from '../pageobjects/swagLabs/login.ts';
import { browser, driver } from '@wdio/globals';

describe('E2E Login flow for Swag Labs', () => {
  it('should perform login', async () => {
    const loginPage = new LoginPage();
    await loginPage.login();
    await loginPage.tapLoginButton();
    await browser.pause(10000);
  });
});
