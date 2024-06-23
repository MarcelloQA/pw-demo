import { RegisterPage } from 'pages/register.page';
import { Topbar } from 'components/topbar.component';
import { Navbar } from 'components/navbar.component';
import { test as base } from '@playwright/test';

type Fixtures = {
  registerPage: RegisterPage;
  topbar: Topbar;
  navbar: Navbar;
};

export const test = base.extend<Fixtures>({
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  topbar: async ({ page }, use) => {
    await use(new Topbar(page));
  },
  navbar: async ({ page }, use) => {
    await use(new Navbar(page));
  },
});
