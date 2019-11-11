import express from 'express';
import morgan from 'morgan';
import env from './env';
import config from './config';
import db from './db';

const configure = (cb) => {
  cb(morgan, express);
};

const { server } = env;
const app = express();
const { sequelize } = db;

configure(config(app));

if (process.env.NODE_ENV !== 'test') {
  sequelize.sync().then(() => {
    app.listen(server[process.env.NODE_ENV], () => {
      console.log(`Server running on port ${server[process.env.NODE_ENV]}`);
    });
  });
}

export default app;
