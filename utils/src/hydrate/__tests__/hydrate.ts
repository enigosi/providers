import knex from '../../../../api/src/db';
import hydrate from '../hydrate';

beforeEach(() => knex('patients').truncate());

afterAll(() => knex.destroy());

const EXPECTED_FIRST_ROW = {
  Id: 1,
  'Provider Name': 'SOUTHEAST ALABAMA MEDICAL CENTER',
  'Provider Street Address': '1108 ROSS CLARK CIRCLE',
  'Provider City': 'DOTHAN',
  'Provider State': 'AL',
  'Provider Zip Code': '36301',
  'Hospital Referral Region Description': 'AL - Dothan',
  'Total Discharges': 91,
  'Average Covered Charges Cents': 3296307,
  'Average Total Payments Cents': 577724,
  'Average Medicare Payments Cents': 476373
};

test('should import all data in the correct format', async () => {
  await hydrate('__tests__/test-data.csv');
  const data = await knex('patients');

  expect(data.length).toBe(20);
  expect(data[0]).toMatchObject(EXPECTED_FIRST_ROW);
});
