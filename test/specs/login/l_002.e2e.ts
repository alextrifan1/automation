import LoginPage from '../../pageobjects/swagLabs/login.ts';
import { expect } from '@wdio/globals';
import users from '../../test-data/users.json' with { type: 'json' };

describe('E2E Login flow for Swag Labs', () => {
  it('should perform login with a locked out user', async () => {
    const loginPage = new LoginPage();

    expect(await loginPage.isTitleDisplayed()).toBe(true);

    await loginPage.login(users.lockedOutUser.username, users.lockedOutUser.password);
    await loginPage.tapLoginButton();
    expect(await loginPage.isErrorMessageContainerDisplayed()).toBe(true);
    expect(await loginPage.getErrorText()).toBe(
      'Epic sadface: Sorry, this user has been locked out.',
    );
  });
});
