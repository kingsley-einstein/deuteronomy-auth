import { Sequelize, DataTypes } from 'sequelize';
import configuration from './config';
import models from './models';

const { Auth, Blacklist } = models;

const sequelize = new Sequelize(
  configuration[process.env.NODE_ENV]
);

const db = {
  models: {
    User: Auth(sequelize, DataTypes),
    Blacklist: Blacklist(sequelize, DataTypes)
  },
  sequelize
};

export default db;
