import LoginPage from '../pageobjects/swagLabs/login.ts';
import { browser, expect } from '@wdio/globals';
import ProductPage from '../pageobjects/swagLabs/product.ts';

describe('E2E Login flow for Swag Labs', () => {
  it('should perform login with valid user', async () => {
    const loginPage = new LoginPage();
    const productPage = new ProductPage();

    expect(await loginPage.isTitleDisplayed()).toBe(true);

    await loginPage.login();
    await loginPage.tapLoginButton();
    expect(await productPage.isProductPageTitleDisplayed()).toBe(true);
  });
});
