const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  import('dotenv').then((dotenv) => {
    dotenv.config();
  });
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
  }
};
