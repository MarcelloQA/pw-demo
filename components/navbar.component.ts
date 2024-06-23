import { Locator, Page, expect } from '@playwright/test';

export class Navbar {
  readonly page: Page;
  readonly whatsNewButton: Locator;
  readonly womenCategoryButton: Locator;
  readonly menCategoryButton: Locator;
  readonly gearCategoryButton: Locator;
  readonly trainingCategoryButton: Locator;
  readonly saleCategoryButton: Locator;
  readonly storeSearchInput: Locator;
  readonly storeCartButton: Locator;
  readonly searchSingleResult: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.whatsNewButton = page.getByRole('menuitem', { name: "What's New" });
    this.womenCategoryButton = page.getByRole('menuitem', { name: 'Women' });
    this.menCategoryButton = page.getByRole('menuitem', { name: 'Men' });
    this.gearCategoryButton = page.getByRole('menuitem', { name: 'Gear' });
    this.trainingCategoryButton = page.getByRole('menuitem', { name: 'Training' });
    this.saleCategoryButton = page.getByRole('menuitem', { name: 'Sale' });
    this.storeSearchInput = page.getByPlaceholder('Search entire store');
    this.storeCartButton = page.getByRole('link', { name: 'My Cart' });
    this.searchSingleResult = page.getByRole('listitem');
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
  }

  async clickNavButton(locator: Locator) {
    await locator.click();
  }

  async searchForProduct(productName: string) {
    await this.storeSearchInput.fill(productName);
    await this.storeSearchInput.press('Enter');
  }

  async verifySearchedProductsNames(productName: string) {
    const item = this.searchSingleResult.filter({ hasText: productName }).filter({ has: this.addToCartButton });

    const count = await item.count();
    for (let i = 0; i < count; ++i) {
      const results = item.nth(i);
      await expect(results).toContainText(productName);
    }
    expect(count).toBeGreaterThan(0);
  }
}
