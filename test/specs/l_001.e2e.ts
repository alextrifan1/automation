import LoginPage from '../pageobjects/swagLabs/login.ts';
import { browser, expect } from '@wdio/globals';
import InventoryPage from '../pageobjects/swagLabs/product.ts';
import users from '../test-data/users.json' with { type: 'json' };

describe('E2E Login flow for Swag Labs', () => {
  it('should perform login with standard user', async () => {
    const loginPage = new LoginPage();
    const inventoryPage = new InventoryPage();

    expect(await loginPage.isTitleDisplayed()).toBe(true);

    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await loginPage.tapLoginButton();
    expect(await inventoryPage.isProductPageTitleDisplayed()).toBe(true);
  });
});
