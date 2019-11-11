import db from '../db';

const {
  models: { User }
} = db;

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
}
