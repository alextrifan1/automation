import { isDisplayedSafe } from '../../utils/helpers.ts';
import { $, $$ } from '@wdio/globals';
import type { ChainablePromiseElement } from 'webdriverio';

export default class CartPage {
  private get pageTitle() {
    return $('.title');
  }

  private get cartItems() {
    return $$('.cart_item');
  }

  private get cartContainer() {
    return $('.cart_list');
  }

  private get checkoutButton() {
    return $('button[data-test="checkout"]');
  }

  private get continueShoppingButton() {
    return $('button[data-test="continue-shopping"]');
  }

  private get shoppingCartBadge() {
    return $('.shopping_cart_badge');
  }

  // basic visibility helpers

  async isPageTitleDisplayed(): Promise<boolean> {
    return isDisplayedSafe(this.pageTitle);
  }

  async isCartContainerDisplayed(): Promise<boolean> {
    return isDisplayedSafe(this.cartContainer);
  }

  async isShoppingCartBadgeDisplayed(): Promise<boolean> {
    return isDisplayedSafe(this.shoppingCartBadge);
  }

  async getShoppingCartBadgeCount(): Promise<number | null> {
    if (await this.isShoppingCartBadgeDisplayed()) {
      const text = await this.shoppingCartBadge.getText();
      return parseInt(text, 10);
    }
    return null;
  }

  async getCartItemsText(selector: string): Promise<string[]> {
    const items = await this.cartItems;
    const results: string[] = [];

    for (const item of items) {
      const el = (await item.$(selector)) as ChainablePromiseElement<WebdriverIO.Element>;
      results.push((await el.getText()).trim());
    }

    return results;
  }

  // getters for cart item details
  async getCartItemsTitles(): Promise<string[]> {
    return this.getCartItemsText('.inventory_item_name');
  }

  async getCartItemsDescriptions(): Promise<string[]> {
    return this.getCartItemsText('.inventory_item_desc');
  }

  async getCartItemsPrices(): Promise<string[]> {
    return this.getCartItemsText('.inventory_item_price');
  }

  async getItemCount(): Promise<number> {
    const items = await this.cartItems;
    return items.length;
  }

  async removeItemByIndex(index: number): Promise<void> {
    const items = await this.cartItems;
    const removeButton = await items[index].$('button');
    await removeButton.click();
  }

  async removeItemByTitle(title: string): Promise<void> {
    const items = await this.cartItems;
    for (const item of items) {
      const nameEl = await item.$('.inventory_item_name');
      const text = (await nameEl.getText()).trim();
      if (text === title) {
        const removeButton = await item.$('button');
        await removeButton.click();
        return;
      }
    }
    throw new Error(`Cart item with title "${title}" not found`);
  }
}
