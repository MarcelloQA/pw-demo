import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '@pages/base.abstract';
import { Filter } from '@interfaces/filter';
import { Product } from '@interfaces/products';

export class ProductCategoryPage extends BasePage {
  readonly categoryFilterList: Locator;
  readonly activityFilterList: Locator;
  readonly priceFilterList: Locator;
  readonly productItem: Locator;
  readonly itemsCountLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.categoryFilterList = page.getByRole('tab', { name: 'Category' });
    this.activityFilterList = page.getByRole('tab', { name: 'Activity' });
    this.priceFilterList = page.getByRole('tab', { name: 'Price' });
    this.productItem = page.locator('.product-item');
    this.itemsCountLabel = page.locator('id=toolbar-amount').first();
  }

  async expandFilterList(locator: Locator) {
    await locator.click();
  }

  async selectFilter(filter: Filter) {
    await this.page.locator('#narrow-by-list').getByText(filter.name).click();
  }

  async addSingleProductToCart({ name }: Product) {
    await this.productItem.filter({ hasText: name }).hover();
    await this.addToCartButton.first().click();
  }

  async addToCart(products: Product[]) {
    await expect(this.itemsCountLabel).toBeVisible();
    for (const product of products) {
      await this.addSingleProductToCart(product);
    }
  }

  async enterProductDetails(name: string) {
    await this.productItem.filter({ hasText: name }).click();
  }

  async clickAddToCartButton() {
    await this.addToCartButton.click();
    await expect.soft(this.addedToCartSuccessMessage).toBeVisible();
  }
}
