import { User } from 'interfaces/user';
import { expect, Locator, Page } from '@playwright/test';
import { urls } from 'data/urls';
import { BasePage } from './base.abstract';

export class RegisterPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly signInButton: Locator;
  readonly signInButtonLink: Locator;
  newUserEmail: string;
  newUserPassword: string;
  newUserName: string;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByLabel('First Name');
    this.lastNameInput = page.getByLabel('Last Name');
    this.emailInput = page.getByLabel('Email', { exact: true });
    this.passwordInput = page.getByLabel('Password', { exact: true }).first();
    this.confirmPasswordInput = page.getByLabel('Confirm Password');
    this.registerButton = page.getByRole('button', { name: 'Create an Account' });
    this.signInButtonLink = page.getByRole('link', { name: 'Sign In' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
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
    await this.signInButtonLink.click();
    await this.emailInput.fill(this.newUserEmail);
    await this.passwordInput.fill(this.newUserPassword);
    await this.signInButton.click();

    await expect(this.page).toHaveURL(urls.baseUrl);
    await expect(this.page.getByRole('banner').getByText('Welcome, ' + this.newUserName)).toBeVisible();
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
