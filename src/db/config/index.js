import env from '../../env';

const {
  db: {
    development, test, production
  }
} = env;

export default {
  development: {
    username: development.username,
    password: development.password,
    dialect: 'postgres',
    host: development.host,
    database: development.name,
    define: {
      underscored: true
    },
    sync: {
      force: false
    },
  },
  test: {
    username: test.username,
    password: test.password,
    dialect: 'postgres',
    host: test.host,
    database: test.name,
    define: {
      underscored: true
    },
    sync: {
      force: true
    }
  },
  production: {
    username: production.username,
    password: production.password,
    dialect: 'postgres',
    host: production.host,
    database: production.name,
    define: {
      underscored: true
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    sync: {
      force: false
    }
  }
};
