import { User } from 'interfaces/user';
import { faker } from '@faker-js/faker';

export const user: {
  validUser: User;
  registerValidUser: User;
  registerInvalidUser: User;
} = {
  validUser: {
    email: process.env.TEST_VALID_USER_EMAIL!,
    password: process.env.TEST_VALID_PASSWORD!,
    firstName: 'Test-PW',
    lastName: 'Playwright',
  },
  registerInvalidUser: {
    email: faker.internet.email({
      provider: 'coffeedemo123.com',
    }),
    password: faker.internet.password({ length: 7 }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  },
  registerValidUser: {
    email: faker.internet.email({
      provider: 'coffeedemo123.com',
    }),
    password: faker.internet.password({ length: 7 }) + faker.string.symbol(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  },
};
