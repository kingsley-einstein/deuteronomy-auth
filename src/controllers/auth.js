import bcrypt from 'bcryptjs';
import db from '../db';
import helpers from '../helpers';

const { Jwt } = helpers;
const {
  models: { User, Blacklist }
} = db;

export default class AuthController {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async create(req, res) {
    try {
      const { body } = req;
      const user = await User.create(body);
      const data = {
        id: user.id,
        email: user.email,
        hash_id: user.hash_id,
        username: user.username,
        token: Jwt.encode({
          id: user.id,
          password: user.password,
          hash_id: user.hash_id
        })
      };
      res.status(201).json({
        statusCode: 201,
        body: data
      });
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
   */
  static async loginWithUsername(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findByUsername(username);
      if (!user) {
        res.status(404).json({
          statusCode: 404,
          body: `User with username ${username} not found`
        });
        return;
      }
      if (!bcrypt.compareSync(password, user.password)) {
        res.status(400).json({
          statusCode: 400,
          body: 'Incorrect password'
        });
        return;
      }
      const data = {
        id: user.id,
        email: user.email,
        username: user.username,
        hash_id: user.hash_id,
        token: Jwt.encode({
          id: user.id,
          hash_id: user.hash_id,
          password: user.password
        })
      };
      res.status(200).json({
        statusCode: 200,
        body: data
      });
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
   */
  static async loginWithEmail(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);
      if (!user) {
        res.status(404).json({
          statusCode: 404,
          body: `User with email ${email} not found`
        });
        return;
      }
      if (!bcrypt.compareSync(password, user.password)) {
        res.status(400).json({
          statusCode: 400,
          body: 'Incorrect password'
        });
        return;
      }
      const data = {
        id: user.id,
        username: user.username,
        hash_id: user.hash_id,
        email: user.email,
        token: Jwt.encode({
          id: user.id,
          hash_id: user.hash_id,
          password: user.password
        })
      };
      res.status(200).json({
        statusCode: 200,
        body: data
      });
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
   */
  static async update(req, res) {
    try {
      const { user, body } = req;
      const update = await User.update(body, {
        where: {
          id: user.id
        },
        individualHooks: true,
        returning: true
      });
      if (!update) {
        res.status(500).json({
          statusCode: 500,
          body: 'Update failed'
        });
        return;
      }
      res.status(200).json({
        statusCode: 200,
        body: 'Successfully updated'
      });
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
   */
  static async authenticate(req, res) {
    try {
      const { user } = req;
      const body = {
        id: user.id,
        hash_id: user.hash_id,
        email: user.email,
        username: user.username
      };
      res.status(200).json({
        statusCode: 200,
        body
      });
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
   */
  static async logOut(req, res) {
    try {
      const { token, user } = req;
      const invalidated = await Blacklist.create({ token });
      if (!invalidated) {
        res.status(500).json({
          statusCode: 500,
          body: 'Unable to sign user out'
        });
        return;
      }
      res.status(200).json({
        statusCode: 200,
        body: `Successfully signed out user ${user.username}`
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }
}
