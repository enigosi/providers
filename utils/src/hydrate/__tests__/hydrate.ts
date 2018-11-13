import knex from '../../../../api/src/db';
import hydrate from '../hydrate';

beforeEach(() => knex('patinets').truncate());

// afterEach(() => knex.destroy());

test.only('should import all data in the correct format', async () => {
  await hydrate('./test-data.csv');
  const data = await knex('patients');

  expect(data.length).toBe(20);
});
