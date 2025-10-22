import InventoryPage from '../../../pageobjects/swagLabs/product.ts';
import LoginPage from '../../../pageobjects/swagLabs/login.ts';
import { expect } from '@wdio/globals';
import users from '../../../test-data/users.json' with { type: 'json' };

describe('Inventory - add and remove product', () => {
  it('should add a product and then remove it, updating the cart badge', async () => {
    const loginPage = new LoginPage();
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await loginPage.tapLoginButton();

    const inventory = new InventoryPage();

    await inventory.addToCartByIndex(0);
    expect(await inventory.getCartBadgeCount()).toBe(1);
    expect((await inventory.getProductButtonTextByIndex(0)).toLowerCase()).toContain('remove');

    await inventory.removeFromCartByIndex(0);
    expect(await inventory.isCartBadgeDisplayed()).toBe(false);
    expect((await inventory.getProductButtonTextByIndex(0)).toLowerCase()).toContain('add');
  });
});
