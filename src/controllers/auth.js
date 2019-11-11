import db from '../db';
import helpers from '../helpers';

const { Jwt } = helpers;
const {
  models: { User }
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
}
