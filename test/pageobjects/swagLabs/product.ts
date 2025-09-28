import { $, $$, } from '@wdio/globals';
import {isDisplayedSafe} from "../../utils/helpers.ts";


//TODO: decide on locator structure
//TODO: add remove item method
//TODO: rename to InventoryPage

export default class ProductPage {
    private get inventoryItems() {
        return $$('.inventory_item');
    }

    private get cartBadge() {
        return $('.shopping_cart_badge');
    }

    private get sortDropdown() {
        return $('.product_sort_container');
    }

    private get pageTitle() {
        return $('.app_logo');
    }

    private get cartButton() {
        return $('.shopping_cart_link');
    }

    // Adding Products to Cart

    async addToCartByIndex(productIndex: number): Promise<void> {
        const items = await this.inventoryItems;
        if (productIndex >= items.length || productIndex < 0) {
            throw new Error('Product index out of bounds');
        }

        await this.tapAddToCartButton(items[productIndex]);
    }

    async addToCartByName(productName: string): Promise<void> {
        const items = await this.inventoryItems;

        for (const product of items) {
            const title = await this.getProductTitleElement(product).getText();
            if (title.trim() === productName) {
                await this.tapAddToCartButton(product);
                return
            }
        }

        throw new Error(`Product with name "${productName}" was not found`);
    }

    private async tapAddToCartButton(product: ChainablePromiseElement): Promise<void> {
        const button = await this.getProductButton(product);
        if (!button) {
            throw new Error('Add to Cart button not found for the product');
        }
        await button.click();
    }

    async tapCheckoutButton(): Promise<void> {
        await this.cartButton.click();
    }

    // get and isDisplayed functions

    private getProductTitleElement(product: ChainablePromiseElement) {
        return product.$('.inventory_item_name');
    }

    private getProductPriceElement(product: ChainablePromiseElement) {
        return product.$('.inventory_item_price');
    }

    private getProductButton(product: ChainablePromiseElement) {
        return product.$('button');
    }

    async getAllProductTitles(): Promise<string[]> {
        const items = await this.inventoryItems;
        const titles: string[] = [];
        for (const product of items) {
            titles.push(await this.getProductTitleElement(product).getText());
        }
        return titles;
    }

    async getProductTitleByName(productName: string): Promise<string | null> {
        const items = await this.inventoryItems;
        for (const product of items) {
            const title = await this.getProductTitleElement(product).getText();
            if (title.trim() === productName) return title;
        }
        return null;
    }


    async getAllProductPrices(): Promise<number[]> {
        const items = await this.inventoryItems;
        const prices: number[] = [];
        for (const product of items) {
            const priceText = await this.getProductPriceElement(product).getText(); // "$29.99"
            prices.push(parseFloat(priceText.replace('$', '')));
        }
        return prices;
    }

    async isProductPageTitleDisplayed(): Promise<boolean> {
        return isDisplayedSafe(this.pageTitle);
    }

    async isCartBadgeDisplayed(): Promise<boolean> {
        return isDisplayedSafe(this.cartBadge)
    }

    async getCartBadgeCount(): Promise<number | null> {
        if (await this.isCartBadgeDisplayed()) {
            const text = await this.cartBadge.getText();
            return parseInt(text, 10);
        }
        return null;
    }

    // Filtering

    async applyFilter(filter: 'Name (A to Z)' | 'Name (Z to A)' | 'Price (low to high)' | 'Price (high to low)') {
       const map: Record<string, string> = {
           'Name (A to Z)': 'az',
           'Name (Z to A)': 'za',
           'Price (low to high)': 'lohi',
           'Price (high to low)': 'hilo'
       }

       await this.sortDropdown.selectByAttribute('value', map[filter])
    }
}