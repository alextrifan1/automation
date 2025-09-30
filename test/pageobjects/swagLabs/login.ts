import { loginPageLocator } from '../../locators/swagLabsLocators/loginPage.ts';
import { $ } from '@wdio/globals';
import { isDisplayedSafe } from '../../utils/helpers.ts';

//TODO: change locators to use getter methods
export default class LoginPage {
  private get pageTitle() {
    return $('.login_logo');
  }

  async login(username: string, password: string): Promise<void> {
    const usernameField = await this.getUsernameField();
    const passwordField = await this.getPasswordField();

    await usernameField.setValue(username);
    await passwordField.setValue(password);
  }

  async getUsernameField(): Promise<ChainablePromiseElement> {
    return $(loginPageLocator.usernameField);
  }

  async getPasswordField(): Promise<ChainablePromiseElement> {
    return $(loginPageLocator.passwordField);
  }

  async getUsernameList(): Promise<string[]> {
    const usernameText = await $(loginPageLocator.usernameList).getText();
    return usernameText.replace('Accepted usernames are:', '').trim().split('\n');
  }

  async getPasswordList(): Promise<string> {
    return await $(loginPageLocator.passwordList).getText();
  }

  async tapLoginButton(): Promise<void> {
    const loginButton = await $(loginPageLocator.logginBtn);
    loginButton.waitForClickable({ timeout: 30000 });
    loginButton.click();
  }

  async isTitleDisplayed(): Promise<boolean> {
    return isDisplayedSafe(this.pageTitle);
  }
}
