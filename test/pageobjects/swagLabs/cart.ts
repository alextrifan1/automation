import {isDisplayedSafe} from "../../utils/helpers.ts";
import { $, $$ } from '@wdio/globals';

//TODO: decide on locator structure
//TODO: add remove item method

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

    private get itemNameElement() {
        return $$('.inventory_item_name');
    }

    private get itemDescriptionElement() {
        return $$('.inventory_item_desc');
    }

    private get itemPriceElement() {
        return $$('.inventory_item_price');
    }

    private get shoppingCartBadge() {
        return $('.shopping_cart_badge');
    }

    //

    async isPageTitleDisplayed(): Promise<boolean> {
        return isDisplayedSafe(this.pageTitle);
    }

    async isCartContainerDisplayed(): Promise<boolean> {
        return isDisplayedSafe(this.cartContainer)
    }

    async getCartItemsText(selector: string): Promise<string[]> {
        const items = await this.cartItems;
        const results: string[] = [];

        for (const item of items) {
            const el = await item.$(selector);
            results.push(await el.getText());
        }

        return results;
    }

    async getCartItemsTitles(): Promise<string[]> {
        return this.getCartItemsText(this.itemNameElement);
    }

    async getCartItemsDescriptions(): Promise<string[]> {
        return this.getCartItemsText(this.itemDescriptionElement);
    }

    async getCartItemsPrices(): Promise<string[]> {
        return this.getCartItemsText(this.itemPriceElement);
    }

    async getItemCount(): Promise<number> {
        return this.cartItems.length;
    }
}