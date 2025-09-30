import { isDisplayedSafe } from '../../utils/helpers.ts';
import { $, $$ } from '@wdio/globals';

//TODO: decide on locator structure

export default class CheckoutPage {
  private get yourInformationTitle() {
    return $('[data-test="title"]:text("Checkout: Your Information")');

  }

  private get overviewTitle() {
    return $('[data-test="title"]:text("Checkout: Overview")');
  }

  private get completeTitle() {
    return $('[data-test="title"]:text("Checkout: Complete!")');
  }

  private get cancelButton() {
    return $('button[data-test="cancel"]');
  }

  private get continueButton() {
    return $('input[data-test="continue"]');
  }

  private get firstNameField() {
    return $('input[data-test="firstName"]');
  }

  private get lastNameField() {
    return $('input[data-test="lastName"]');
  }

  private get postalCodeField() {
    return $('input[data-test="postalCode"]');
  }

  //

  async isInformationPageDisplayed(): Promise<boolean> {
    return isDisplayedSafe(this.yourInformationTitle);
  }

  async isOverviewPageDisplayed(): Promise<boolean> {
    return isDisplayedSafe(this.overviewTitle);
  }

  async enterFirstName(firstName: string): Promise<void> {
    const firstNameField = await this.firstNameField;
    await firstNameField.setValue(firstName);
  }

  async enterLastName(lastName: string): Promise<void> {
    const lastNameField = await this.lastNameField;
    await lastNameField.setValue(lastName);
  }

  async enterPostalCode(postalCode: string): Promise<void> {
    const postalCodeField = await this.postalCodeField;
    await postalCodeField.setValue(postalCode);
  }

  async tapContinueButton(): Promise<void> {
    const continueButton = await this.continueButton;
    await continueButton.click();
  }
}
