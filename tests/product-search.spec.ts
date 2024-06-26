import { test } from 'fixtures/fixtures';
import { category } from 'data/categories';
import { activityFilter, categoryFilter } from 'data/filters';
import { athleticProducts } from 'data/athleticProducts';

test.describe('Product search test', () => {
  test.beforeEach(async ({ navbar }) => {
    await navbar.goToBaseUrl();
  });

  test('should verify that user can search for products using search bar', async ({ navbar }) => {
    await navbar.searchForProduct('Watch');
    await navbar.verifySearchedProductsNames('Watch');
  });

  test('should verify that user can search for products using categories, filters and add them to the cart', async ({
    navbar,
    productCategoryPage,
  }) => {
    await test.step('hover over category and click it', async () => {
      await navbar.hoverOverNavButton(navbar.gearCategoryButton);
      await navbar.clickCategoryFromList(category.fitnesEquipment);
    });
    await test.step('select first filter', async () => {
      await productCategoryPage.expandFilterList(productCategoryPage.categoryFilterList);
      await productCategoryPage.selectFilter(categoryFilter.exercise);
    });
    await test.step('select second filter', async () => {
      await productCategoryPage.expandFilterList(productCategoryPage.activityFilterList);
      await productCategoryPage.selectFilter(activityFilter.athletic);
    });
    await test.step('add products to cart', async () => {
      await productCategoryPage.addToCart(athleticProducts);
      await productCategoryPage.verifyNumberOfProductsInCartCounter();
    });
  });

  test('should verify that user can add single product from the product details page', async ({ productCategoryPage, cartPage }) => {
    await productCategoryPage.searchForProduct('Didi Sport Watch');
    await productCategoryPage.enterProductDetails('Didi Sport Watch');
    await productCategoryPage.clickAddToCartButton();
    await productCategoryPage.navigateToCart();
    await cartPage.verifyProductInCart('Didi Sport Watch');
  });
});
