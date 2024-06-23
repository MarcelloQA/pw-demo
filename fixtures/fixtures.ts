import { RegisterPage } from 'pages/register.page';
import { Topbar } from 'components/topbar.component';
import { test as base } from '@playwright/test';

type Fixtures = {
  registerPage: RegisterPage;
  topbar: Topbar;
};

export const test = base.extend<Fixtures>({
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  topbar: async ({ page }, use) => {
    await use(new Topbar(page));
  },
});
