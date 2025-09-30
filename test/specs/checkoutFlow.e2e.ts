import LoginPage from '../pageobjects/swagLabs/login.ts';
import ProductPage from '../pageobjects/swagLabs/product.ts';
import { expect } from '@wdio/globals';
import CartPage from '../pageobjects/swagLabs/cart.ts';

describe('E2E Checkout flow for Swag Labs', () => {
  it('should perform checkout with valid user', async () => {
    const loginPage = new LoginPage();
    const productPage = new ProductPage();
    const cartPage = new CartPage();

    await loginPage.login();
    await loginPage.tapLoginButton();

    expect(await productPage.isProductPageTitleDisplayed()).toBe(true);

    await productPage.addToCartByIndex(0);
    expect(await productPage.getCartBadgeCount()).toBe(1);
    await productPage.tapCheckoutButton();

    expect(await cartPage.isPageTitleDisplayed()).toBe(true);
    expect(await cartPage.isCartContainerDisplayed()).toBe(true);
    expect(await cartPage.getItemCount()).toEqual(1);
    expect(await cartPage.getCartItemsTitles()[0]).toEqual('Sauce Labs Backpack');

    await cartPage.tapCheckoutButton();
  });
});
