const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  require('dotenv').config();
}

export default {
  db: {
    development: {
      username: process.env.DATABASE_DEV_USER,
      password: process.env.DATABASE_DEV_PASS,
      host: process.env.DATABASE_DEV_HOST,
      name: process.env.DATABASE_DEV_NAME,
      port: process.env.DATABASE_DEV_PORT
    },
    test: {
      username: process.env.DATABASE_TEST_USER,
      password: process.env.DATABASE_TEST_PASS,
      host: process.env.DATABASE_TEST_HOST,
      name: process.env.DATABASE_TEST_NAME,
      port: process.env.DATABASE_TEST_PORT
    },
    production: {
      username: process.env.DATABASE_PROD_USER,
      password: process.env.DATABASE_PROD_PASS,
      host: process.env.DATABASE_PROD_HOST,
      name: process.env.DATABASE_PROD_NAME
    }
  },
  server: {
    development: process.env.DEV_PORT,
    test: process.env.TEST_PORT,
    production: process.env.PORT
  },
  jwt_secret: process.env.JWT_SECRET,
  cloud_opts: {
    name: process.env.CLOUD_NAME,
    endpoint: process.env.CLOUD_ENDPOINT,
    profiles: process.env.CLOUD_PROFILES
  }
};
