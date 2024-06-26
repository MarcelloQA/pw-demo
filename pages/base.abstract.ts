import { Locator, Page, expect } from '@playwright/test';
import { urls } from 'data/urls';

export abstract class BasePage {
  readonly page: Page;
  readonly storeSearchInput: Locator;
  readonly searchSingleResult: Locator;
  readonly addToCartButton: Locator;
  readonly cartButton: Locator;
  readonly cartCounter: Locator;
  readonly cartLoadingSpinner: Locator;
  readonly viewAndEditCartButton: Locator;
  readonly addedToCartSuccessMessage: Locator;
  productCount: number;

  constructor(page: Page) {
    this.page = page;
    this.storeSearchInput = page.getByPlaceholder('Search entire store');
    this.searchSingleResult = page.locator('.product-item');
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' }).first();
    this.cartButton = page.getByRole('link', { name: 'Cart' }).first();
    this.cartCounter = page.locator('.counter-number');
    this.cartLoadingSpinner = page.locator('.loader');
    this.viewAndEditCartButton = page.getByRole('link', { name: 'View and Edit Cart' });
    this.addedToCartSuccessMessage = page.getByText('You added');
  }

  async goToBaseUrl() {
    await this.page.goto(urls.baseUrl);
  }

  async searchForProduct(productName: string) {
    await this.storeSearchInput.fill(productName);
    await this.storeSearchInput.press('Enter');
  }

  async verifySearchShowsAtLeastOneResult() {
    this.productCount = await this.searchSingleResult.count();
    expect(this.productCount).toBeGreaterThan(0);
  }

  async verifySearchedProductsNames(productName: string) {
    const item = this.searchSingleResult.filter({ hasText: productName });

    const count = await item.count();
    for (let i = 0; i < count; ++i) {
      const results = item.nth(i);
      await expect(results).toContainText(productName);
    }
    if (count === 0) {
      throw new Error(`No results found for "${productName}"`);
    }
    expect(count).toBeGreaterThan(0);
  }

  async verifyNumberOfProductsInCartCounter() {
    this.productCount = await this.searchSingleResult.count();
    await expect(this.cartCounter).toHaveText(this.productCount.toString());
  }

  async navigateToCart() {
    await this.cartButton.click();
    await this.viewAndEditCartButton.click();
  }

  async verifyItemsInCart() {
    this.productCount = await this.searchSingleResult.count();
    expect(this.productCount).toBeGreaterThan(0);
  }
}
