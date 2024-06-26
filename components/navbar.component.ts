import { Locator, Page, expect } from '@playwright/test';
import { Category } from '@interfaces/category';
import { BasePage } from '@pages/base.abstract';

export class Navbar extends BasePage {
  readonly whatsNewButton: Locator;
  readonly womenCategoryButton: Locator;
  readonly menCategoryButton: Locator;
  readonly gearCategoryButton: Locator;
  readonly trainingCategoryButton: Locator;
  readonly saleCategoryButton: Locator;
  readonly productCategoryFromList: Locator;

  constructor(page: Page) {
    super(page);
    this.whatsNewButton = page.getByRole('menuitem', { name: "What's New" });
    this.womenCategoryButton = page.getByRole('menuitem', { name: 'Women' });
    this.menCategoryButton = page.getByRole('menuitem', { name: 'Men' });
    this.gearCategoryButton = page.getByRole('menuitem', { name: 'Gear' });
    this.trainingCategoryButton = page.getByRole('menuitem', { name: 'Training' });
    this.saleCategoryButton = page.getByRole('menuitem', { name: 'Sale' });
    this.productCategoryFromList = page.getByRole('menuitem');
  }

  async clickNavButton(locator: Locator) {
    await locator.click();
  }

  async hoverOverNavButton(locator: Locator) {
    await locator.hover();
  }

  async clickCategoryFromList(productCategory: Category) {
    await expect(this.productCategoryFromList.filter({ hasText: productCategory.name })).toBeVisible();
    await this.productCategoryFromList.filter({ hasText: productCategory.name }).click();
  }
}
