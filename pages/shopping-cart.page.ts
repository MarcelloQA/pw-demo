import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.abstract';

export class CartPage extends BasePage {
  readonly shoppingCartLabel: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly shoppingCarTable: Locator;

  constructor(page: Page) {
    super(page);
    this.shoppingCartLabel = page.getByRole('heading', { name: 'Shopping Cart' });
    this.proceedToCheckoutButton = page.getByRole('button', { name: 'Proceed to checkout' });
    this.shoppingCarTable = page.locator('#shopping-cart-table');
  }

  async verifyProductInCart(productName: string) {
    await expect(this.shoppingCartLabel).toBeVisible();
    await expect(this.proceedToCheckoutButton).toBeVisible();
    await expect(this.shoppingCarTable).toContainText(productName);
  }
}
