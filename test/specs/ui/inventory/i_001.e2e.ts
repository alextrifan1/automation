import LoginPage from '../../../pageobjects/swagLabs/login.ts';
import { expect } from '@wdio/globals';
import InventoryPage from '../../../pageobjects/swagLabs/product.ts';
import users from '../../../test-data/users.json' with { type: 'json' };

describe('Inventory - check if page is loaded', () => {
  it('should check if the inventory page is loaded', async () => {
    const loginPage = new LoginPage();
    const inventoryPage = new InventoryPage();

    expect(await loginPage.isTitleDisplayed()).toBe(true);

    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await loginPage.tapLoginButton();

    expect(await inventoryPage.isProductPageTitleDisplayed()).toBe(true);
    expect(await inventoryPage.areAllProductsDisplayed()).toBe(true);

    //TODO: fix the hardcoded values

    const products = await inventoryPage.getAllProductTitles();
    expect(products.length).toBe(6);

    const priceTags = await inventoryPage.getAllProductPrices();
    expect(priceTags.length).toBe(6);
  });
});
