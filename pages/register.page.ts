import { User } from 'interfaces/user';
import { expect, Locator, Page } from '@playwright/test';
import { urls } from 'data/urls';

export class RegisterPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  newUserEmail: string;
  newUserPassword: string;
  newUserName: string;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByLabel('First Name');
    this.lastNameInput = page.getByLabel('Last Name');
    this.emailInput = page.getByLabel('Email', { exact: true });
    this.passwordInput = page.getByLabel('Password', { exact: true });
    this.confirmPasswordInput = page.getByLabel('Confirm Password');
    this.registerButton = page.getByRole('button', { name: 'Create an Account' });
    this.newUserEmail = '';
    this.newUserPassword = '';
    this.newUserName = '';
  }

  async registerUser(user: User) {
    this.newUserEmail = user.email;
    this.newUserPassword = user.password;
    this.newUserName = user.firstName + ' ' + user.lastName;

    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
    await this.registerButton.click();
  }

  async verifyThatRegisteredUserCanLogin() {
    await this.page.goto(urls.baseUrl);
    await this.page.getByRole('link', { name: 'Sign In' }).click();
    await this.page.getByLabel('Email', { exact: true }).fill(this.newUserEmail);
    await this.page.getByLabel('Password').fill(this.newUserPassword);
    await this.page.getByRole('button', { name: 'Sign In' }).click();

    await expect(this.page.getByRole('banner').getByText('Welcome, ' + this.newUserName)).toBeVisible();
    await expect(this.page).toHaveURL(urls.baseUrl);
  }

  async verifyRegistrationSuccess(registeredSuccessfully: boolean, user: User) {
    if (registeredSuccessfully) {
      await expect(this.page).toHaveURL(urls.accountUrl);
      await expect(this.page).toHaveTitle('My Account');
      await expect(this.page.getByText(user.firstName)).toBeVisible();
      await expect(this.page.getByText(user.lastName)).toBeVisible();
    } else {
      await expect(this.page).toHaveURL(urls.registerUrl);
      await expect(this.page).toHaveTitle('Create New Customer Account');
    }
  }
}
