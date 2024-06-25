import { test } from 'fixtures/fixtures';
import { user } from 'data/users';

test.describe('Register page test', () => {
  test.beforeEach(async ({ topbar }) => {
    await topbar.goToBaseUrl();
  });

  test('should verify that user can register with valid credentials', async ({ registerPage, topbar }) => {
    await test.step('register a new account and logout', async () => {
      await topbar.clickRegisterLink();
      await registerPage.registerUser(user.registerValidUser);
      await registerPage.verifyRegistrationSuccess(true, user.registerValidUser);
      await topbar.logout();
    });
    await test.step('login with the created account', async () => {
      await topbar.goToBaseUrl();
      await registerPage.verifyThatRegisteredUserCanLogin();
    });
  });

  test('should verify that user cannot register with invalid credentials', async ({ registerPage, topbar }) => {
    await topbar.clickRegisterLink();
    await registerPage.registerUser(user.registerInvalidUser);
    await registerPage.verifyRegistrationSuccess(false, user.registerInvalidUser);
  });
});
