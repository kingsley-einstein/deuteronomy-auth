import { expect } from 'chai';
import supertest from 'supertest';
import db from '../db';
import app from '..';

const {
  models: { User },
  sequelize
} = db;

const root = '/api/v1/auth';
let token = '';

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
          console.table([body.body]);
          expect(status).to.eql(201);
          expect(body).to.have.keys('statusCode', 'body');
          done(err);
        });
    });
    it('should respond with a 400 if user exists', (done) => {
      supertest(app)
        .post(`${root}/register`)
        .send({
          username: 'garfield',
          email: 'garfield@gmail.com',
          password: 'password'
        })
        .end((err, res) => {
          const { status, body } = res;
          console.table([body]);
          expect(status).to.eql(400);
          done(err);
        });
    });
    it('should log a user in using their username', (done) => {
      supertest(app)
        .post(`${root}/login_with_username`)
        .send({
          username: 'garfield',
          password: 'password'
        })
        .end((err, res) => {
          const { status, body } = res;
          token = body.body.token;
          console.table([body.body]);
          expect(status).to.eql(200);
          expect(body.body).to.have.keys('id', 'hash_id', 'token', 'email', 'username');
          done(err);
        });
    });
    it('should log a user in using their email', (done) => {
      supertest(app)
        .post(`${root}/login_with_email`)
        .send({
          email: 'garfield@gmail.com',
          password: 'password'
        })
        .end((err, res) => {
          const { status, body } = res;
          console.table([body.body]);
          expect(status).to.eql(200);
          done(err);
        });
    });
    it('should respond with a 404 if user is not found', (done) => {
      supertest(app)
        .post(`${root}/login_with_username`)
        .send({
          username: 'rodriguez',
          password: 'password'
        })
        .end((err, res) => {
          const { status, body } = res;
          console.table([body]);
          expect(status).to.eql(404);
          done(err);
        });
    });
    it('should respond with a 400 when password is incorrect', (done) => {
      supertest(app)
        .post(`${root}/login_with_username`)
        .send({
          username: 'garfield',
          password: 'incorrect'
        })
        .end((err, res) => {
          const { status, body } = res;
          console.table([body]);
          expect(status).to.eql(400);
          done(err);
        });
    });
    it('should update a user', (done) => {
      supertest(app)
        .patch(`${root}/update`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          password: 'password12345'
        })
        .end((err, res) => {
          const { status, body } = res;
          console.table([body]);
          expect(status).to.eql(200);
          done(err);
        });
    });
    it('should respond with a 401 when authenticating without a token', (done) => {
      supertest(app)
        .get(`${root}/authenticate`)
        .end((err, res) => {
          const { status, body } = res;
          console.table([body]);
          expect(status).to.eql(401);
          done(err);
        });
    });
    it('should authenticate user', (done) => {
      supertest(app)
        .get(`${root}/authenticate`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          const { status, body } = res;
          console.table([body.body]);
          expect(status).to.eql(200);
          done(err);
        });
    });
    it('should log user out', (done) => {
      supertest(app)
        .get(`${root}/logout`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          const { status, body } = res;
          console.table([body]);
          expect(status).to.eql(200);
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
