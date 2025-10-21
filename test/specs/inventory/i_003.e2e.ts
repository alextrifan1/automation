import InventoryPage from '../../pageobjects/swagLabs/product.ts';
import LoginPage from '../../pageobjects/swagLabs/login.ts';
import CartPage from '../../pageobjects/swagLabs/cart.ts';
import { expect } from '@wdio/globals';
import users from '../../test-data/users.json' with { type: 'json' };

describe('Inventory - add 3 products and verify cart', () => {
    it('adds three products and verifies cart list and count', async () => {
        const loginPage = new LoginPage();
        await loginPage.login(users.standardUser.username, users.standardUser.password);
        await loginPage.tapLoginButton();

        const inventory = new InventoryPage();
        const allTitles = await inventory.getAllProductTitles();

        await inventory.addToCartByIndex(0);
        await inventory.addToCartByIndex(1);
        await inventory.addToCartByIndex(2);

        expect(await inventory.getCartBadgeCount()).toBe(3);

        await inventory.tapCheckoutButton();
        const cart = new CartPage();
        const cartTitles = await cart.getCartItemsTitles();

        expect(cartTitles.length).toBe(3);
        expect(cartTitles).toEqual([allTitles[0], allTitles[1], allTitles[2]]);
    });
});
