import ENV_VARS from './env-vars';

const settings = {
  production: {
    client: 'postgresql',
    connection: ENV_VARS.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    }
  },
  development: {
    client: 'postgresql',
    connection: ENV_VARS.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    }
  },
  test: {
    client: 'postgresql',
    connection: ENV_VARS.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    }
  }
};

export const production = settings.production;
export const development = settings.development;
export const test = settings.test;
