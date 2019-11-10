export default {
  development: {
    username: '',
    password: '',
    dialect: 'postgres',
    host: '',
    define: {
      underscored: true
    },
    sync: {
      force: false
    }
  },
  test: {
    username: '',
    password: '',
    dialect: 'postgres',
    host: '',
    define: {
      underscored: true
    },
    sync: {
      force: true
    }
  },
  production: {
    username: '',
    password: '',
    dialect: 'postgres',
    host: '',
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
