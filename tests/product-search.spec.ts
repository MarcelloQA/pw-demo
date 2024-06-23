import { test } from 'fixtures/fixtures';
import { urls } from 'data/urls';

test.describe('Product search test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(urls.baseUrl);
  });

  test('should verify that user can search for products using search bar', async ({ navbar }) => {
    await navbar.searchForProduct('Watch');
    await navbar.verifySearchedProductsNames('Watch');
  });
});
