import { test } from '@fixtures';
import { user } from '@data/users';

test.describe('Login page test', () => {
  test.beforeEach(async ({ navbar }) => {
    await navbar.goToBaseUrl();
  });

  test('should verify that user can log in with valid existing credentials', async ({ topbar, loginPage }) => {
    await topbar.clickLoginLink();
    await loginPage.enterCredentials(user.validUser);
    await loginPage.clickSignInButton();
    await topbar.clickActionMenuOption('My account');
    await loginPage.verifyIfLoggedIn();
  });
});
