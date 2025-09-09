import {loginPageLocator} from "../../locators/swagLabsLocators/loginPage.ts";
import {$} from "@wdio/globals";


export default class LoginPage {

    async login() {
        const usernames = await this.getUsernameList();
        const usernameType = usernames[1];
        const passwords = await this.getPasswordList();
        const passwordType = await passwords[1];
        const usernameField = await this.getUsernameField();

        usernameField.setValue(usernameType);
    }

    async getUsernameField(): Promise<ChainablePromiseElement> {
        return $(loginPageLocator.usernameField);
    }

    async getPasswordField(): Promise<ChainablePromiseElement> {
        return $(loginPageLocator.passwordField);
    }

    async getUsernameList(): Promise<string> {
        return await $(loginPageLocator.usernameList).getText();
    }

    async getPasswordList(): Promise<string> {
        return await $(loginPageLocator.passwordList).getText();
    }

    async tapLoginButton(): Promise<void> {
        await $(loginPageLocator.logginBtn).tap();
    }

    async isTitleDisplayed(): Promise<boolean> {
        return $(loginPageLocator.pageTitle).isDisplayed();
    }
}