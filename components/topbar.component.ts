import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '@pages/base.abstract';

export class Topbar extends BasePage {
  readonly loginLink: Locator;
  readonly registerLink: Locator;
  readonly supportLink: Locator;
  readonly accountActionMenuButton: Locator;
  readonly myAccountOption: Locator;
  readonly signOutOption: Locator;
  readonly welcomeBanner: Locator;

  constructor(page: Page) {
    super(page);
    this.loginLink = page.getByRole('banner').getByText('Sign In');
    this.registerLink = page.getByRole('banner').getByText('Create An Account');
    this.supportLink = page.getByRole('banner').getByText('Support This Project');
    this.accountActionMenuButton = page.getByRole('banner').locator('button').filter({ hasText: 'Change' });
    this.myAccountOption = page.getByRole('link', { name: 'My Account' });
    this.signOutOption = page.getByRole('link', { name: 'Sign Out' });
    this.welcomeBanner = page.getByRole('banner').getByText('Welcome').first();
  }

  async clickLoginLink() {
    await this.loginLink.click();
  }

  async clickRegisterLink() {
    await this.registerLink.click();
  }

  async clickSupportLink() {
    await this.supportLink.click();
  }

  async logout() {
    await expect(this.welcomeBanner).toBeVisible();
    await this.accountActionMenuButton.click();
    await this.signOutOption.click();
  }

  async clickActionMenuOption(optionName: string) {
    await expect(this.welcomeBanner).toBeVisible();
    await this.accountActionMenuButton.click();
    await this.page.getByRole('link', { name: optionName }).click();
  }
}
