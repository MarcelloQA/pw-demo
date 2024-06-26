import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '@pages/base.abstract';
import { User } from '@interfaces/user';
import { urls } from '@data/urls';
import { user } from '@data/users';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginSignInButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel('Email', { exact: true });
    this.passwordInput = page.getByLabel('Password', { exact: true }).first();
    this.loginSignInButton = page.getByRole('button', { name: 'Sign In' });
  }

  async enterCredentials(user: User) {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
  }

  async clickSignInButton() {
    await this.loginSignInButton.click();
  }

  async verifyIfLoggedIn() {
    await expect(this.page).toHaveURL(urls.baseUrl);
    await expect(this.page.getByRole('banner').getByText('Welcome, ' + user.validUser.firstName)).toBeVisible();
  }
}
