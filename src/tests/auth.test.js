import { expect } from 'chai';
import supertest from 'supertest';
import db from '../db';
import app from '..';

const {
  models: { User },
  sequelize
} = db;

const root = '/api/v1/auth';

describe('Auth Tests', () => {
  before((done) => {
    sequelize.sync().then(() => {
      done();
    });
  });
  describe('POST', () => {
    it('should create a user and respond with a 201', (done) => {
      supertest(app)
        .post(`${root}/register`)
        .send({
          username: 'garfield',
          email: 'garfield@gmail.com',
          password: 'password'
        })
        .end((err, res) => {
          const { status, body } = res;
          console.log(body);
          expect(status).to.eql(201);
          expect(body).to.have.keys('statusCode', 'body');
          done(err);
        });
    });
  });
  after((done) => {
    User.destroy({
      where: {
        email: 'garfield@gmail.com'
      }
    }).then(() => {
      done();
    });
  });
});
