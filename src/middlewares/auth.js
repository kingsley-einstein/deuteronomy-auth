import db from '../db';
import helpers from '../helpers';

const {
  models: { User, Blacklist }
} = db;

const { Jwt } = helpers;

export default class Auth {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {*} next
   */
  static async userExists(req, res, next) {
    try {
      const { username, email } = req.body;
      const user = await User.findByUsernameOrEmail(username, email);
      if (user) {
        if (user.email === email) {
          res.status(400).json({
            statusCode: 400,
            body: `Email ${email} already in use`
          });
          return;
        }
        if (user.username === username) {
          res.status(400).json({
            statusCode: 400,
            body: `Username ${username} already in use`
          });
          return;
        }
      }
      next();
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {*} next
   */
  static async checkToken(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        res.status(401).json({
          statusCode: 401,
          body: 'Authorization header not present in request'
        });
        return;
      }
      if (!authorization.startsWith('Bearer')) {
        res.status(401).json({
          statusCode: 401,
          body: 'Authorization header must begin with "Bearer"'
        });
        return;
      }
      const token = authorization.substring(7, authorization.length);
      const payload = await Jwt.verify(token);
      if (!payload) {
        res.status(401).json({
          statusCode: 401,
          body: 'Session has expired'
        });
        return;
      }
      const loggedOut = await Blacklist.findByToken(token);
      if (loggedOut) {
        res.status(401).json({
          statusCode: 401,
          body: 'Only logged in users can access this resource'
        });
        return;
      }
      const user = await User.findByPk(payload.id);
      if (!user) {
        res.status(401).json({
          statusCode: 401,
          body: 'Unable to authenticate'
        });
        return;
      }
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }
}
