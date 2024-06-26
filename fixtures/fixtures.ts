import { LoginPage } from '@pages/login.page';
import { RegisterPage } from '@pages/register.page';
import { ProductCategoryPage } from '@pages/product-category.page';
import { CartPage } from '@pages/shopping-cart.page';
import { Topbar } from '@components/topbar.component';
import { Navbar } from '@components/navbar.component';
import { test as base } from '@playwright/test';

type Fixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  productCategoryPage: ProductCategoryPage;
  cartPage: CartPage;
  topbar: Topbar;
  navbar: Navbar;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  productCategoryPage: async ({ page }, use) => {
    await use(new ProductCategoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  topbar: async ({ page }, use) => {
    await use(new Topbar(page));
  },
  navbar: async ({ page }, use) => {
    await use(new Navbar(page));
  },
});
