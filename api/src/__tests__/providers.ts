import * as request from 'supertest';
import app from '../app';
import knex from '../../../api/src/db';

beforeAll(() => knex.migrate.latest());

beforeEach(() => knex('patients').truncate());

afterAll(() => knex.destroy());

const EXAMPLE_RECORD = {
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

const testData = Array(20)
  .fill(null)
  .map((_, index) => ({
    ...EXAMPLE_RECORD,
    ['Total Discharges']: index,
    ['Average Covered Charges Cents']: index * 100,
    ['Average Medicare Payments Cents']: index * 100
  }));

test('should return list of patients', async () => {
  await knex('patients').insert(testData);

  const response = await request(app).get('/providers');

  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBe(20);
});

test('should correctly parse dollar values', async () => {
  await knex('patients').insert([
    {
      ...EXAMPLE_RECORD,
      ['Average Covered Charges Cents']: 123,
      ['Average Total Payments Cents']: 100000,
      ['Average Medicare Payments Cents']: 100
    }
  ]);

  const response = await request(app).get('/providers');

  expect(response.statusCode).toBe(200);

  expect(response.body[0]['Average Covered Charges']).toBe('$1.23');
  expect(response.body[0]['Average Total Payments']).toBe('$1000.00');
  expect(response.body[0]['Average Medicare Payments']).toBe('$1.00');
});

test('should filter results by discharges', async () => {
  await knex('patients').insert(testData);

  const response = await request(app).get(
    '/providers?max_discharges=14&min_discharges=5'
  );

  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBe(10);
});

test('should filter results by covered charges', async () => {
  await knex('patients').insert(testData);

  const response = await request(app).get(
    '/providers?max_average_covered_charges=14&min_average_covered_charges=5'
  );

  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBe(10);
});

test('should filter results by avarage medicare payments', async () => {
  await knex('patients').insert(testData);

  const response = await request(app).get(
    '/providers?max_average_medicare_payments=14&min_average_medicare_payments=5'
  );

  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBe(10);
});

test('should filter results by state', async () => {
  await knex('patients')
    .insert([
      ...testData,
      { ...EXAMPLE_RECORD, 'Provider State': 'TEST' },
      { ...EXAMPLE_RECORD, 'Provider State': 'TEST' },
      { ...EXAMPLE_RECORD, 'Provider State': 'TEST' }
    ])
    .returning('*');

  const response = await request(app).get('/providers?state=TEST');

  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBe(3);
});

test('should correctly paginate results', async () => {
  await knex('patients').insert(testData);

  const firstPageResponse = await request(app).get(
    '/providers?page=1&per_page=4'
  );

  expect(parseInt(firstPageResponse.headers['x-total-count'], 10)).toBe(
    testData.length
  );
  expect(firstPageResponse.statusCode).toBe(200);
  expect(firstPageResponse.body.length).toBe(4);
  expect(firstPageResponse.body[0]['Total Discharges']).toBe(0);
  expect(firstPageResponse.body[3]['Total Discharges']).toBe(3);
  const secondPageResponse = await request(app).get(
    '/providers?page=2&per_page=4'
  );
  expect(secondPageResponse.statusCode).toBe(200);
  expect(secondPageResponse.body.length).toBe(4);
  expect(secondPageResponse.body[0]['Total Discharges']).toBe(4);
  expect(secondPageResponse.body[3]['Total Discharges']).toBe(7);
});
