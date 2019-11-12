import { Eureka } from 'eureka-js-client';

export default class EurekaInstance extends Eureka {
  static async getInstance(opts) {
    return new EurekaInstance(opts);
  }
}
