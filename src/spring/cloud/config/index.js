import cloudConfig from 'cloud-config-client';

export default class CloudConfig {
  static async load({ name, endpoint, profiles }) {
    return cloudConfig.load({
      name,
      endpoint,
      profiles
    });
  }
}
