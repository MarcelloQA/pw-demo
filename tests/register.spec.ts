import { test } from 'fixtures/fixtures';
import { user } from 'data/users';
import { urls } from 'data/urls';

test.describe('Register page test', () => {
  test.beforeEach(async ({ topbar, page }) => {
    await page.goto(urls.baseUrl);
    await topbar.clickRegisterLink();
  });

  test('should verify that user can register with valid credentials', async ({ registerPage, topbar }) => {
    await test.step('register a new account and logout', async () => {
      await registerPage.registerUser(user.registerValidUser);
      await registerPage.verifyRegistrationSuccess(true, user.registerValidUser);
      await topbar.logout();
    });
    await test.step('login with the created account', async () => {
      await registerPage.verifyThatRegisteredUserCanLogin();
    });
  });

  test('should verify that user cannot register with invalid credentials', async ({ registerPage }) => {
    await registerPage.registerUser(user.registerInvalidUser);
    await registerPage.verifyRegistrationSuccess(false, user.registerInvalidUser);
  });
});
