import jwt from 'jsonwebtoken';
import env from '../env';

export default class Jwt {
  /**
   *
   * @param {*} payload
   */
  static encode(payload) {
    return jwt.sign(payload, env.jwt_secret);
  }

  /**
   *
   * @param {string} token
   */
  static decode(token) {
    return jwt.decode(token);
  }

  /**
   *
   * @param {string} token
   */
  static async verify(token) {
    return jwt.verify(token, env.jwt_secret);
  }
}
