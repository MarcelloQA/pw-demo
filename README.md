Playwright sample tests of https://magento.softwaretestingboard.com/ (a fake e-commerce website for test automation practice) that include:

- account registration, login, searching and adding products to the cart
- POM for easier management of tests
- eslint and prettier to improve code quality and legibility
- parametrized .env variables for "secret" credentials
- github actions that run tests for push and pull requests


---


How to run tests:

1. Create an .env file in the root folder and copy the following: `TEST_VALID_USER_EMAIL='testitout@demopw.test', TEST_VALID_PASSWORD='bestpassword123!'`
2. Run `npm ci`
3. Run `npx playwright install` to download browsers
4. Run all tests using the `npm run test`
