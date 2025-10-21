import InventoryPage from '../../pageobjects/swagLabs/product.ts';
import LoginPage from '../../pageobjects/swagLabs/login.ts';
import { expect } from '@wdio/globals';
import users from '../../test-data/users.json' with { type: 'json' };

describe('Inventory - price filter', () => {
  it('applies low->high then high->low filters and verifies price order', async () => {
    const loginPage = new LoginPage();
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await loginPage.tapLoginButton();

    const inventory = new InventoryPage();

    // Price low -> high
    await inventory.applyFilter('Price (low to high)');
    const pricesLohi = await inventory.getAllProductPrices();
    expect(pricesLohi).toEqual([...pricesLohi].sort((a, b) => a - b));

    // Price high -> low
    await inventory.applyFilter('Price (high to low)');
    const pricesHilo = await inventory.getAllProductPrices();
    expect(pricesHilo).toEqual([...pricesHilo].sort((a, b) => b - a));
  });
});
