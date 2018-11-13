const ENV_VARS = {
  DATABASE_URL: process.env.DATABASE_URL,
  ENV: process.env.ENV || process.env.NODE_ENV || 'dev',
  JWT_SECRET: process.env.JWT_SECRET || 'devsecret'
};

export default ENV_VARS;
