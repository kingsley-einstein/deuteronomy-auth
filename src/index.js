import express from 'express';
import morgan from 'morgan';
import env from './env';
import config from './config';
import db from './db';
import EurekaInstance from './spring/eureka/config';
import CloudConfig from './spring/cloud/config';


const configure = (cb) => {
  cb(morgan, express);
};

const loadConfigAndRegisterWithEureka = async (cloud_opts, eureka_port) => {
  const cloudConfiguration = await CloudConfig.load(cloud_opts);
  const eureka_opts = {
    instance: {
      app: cloudConfiguration.get('eureka.instance.app'),
      hostName: cloudConfiguration.get('eureka.instance.hostName'),
      port: {
        $: eureka_port || 8080,
        enabled: true
      },
      ipAddr: cloudConfiguration.get('eureka.instance.hostName'),
      vipAddress: cloudConfiguration.get('eureka.instance.vipAddress'),
      statusPageUrl: cloudConfiguration.get('eureka.instance.statusPageUrl'),
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn'
      }
    },
    eureka: {
      host: cloudConfiguration.get('eureka.host'),
      port: cloudConfiguration.get('eureka.port') || 80,
      servicePath: '/eureka/apps/'
    }
  };
  const eurekaInstance = await EurekaInstance.getInstance(eureka_opts);
  eurekaInstance.start((err) => {
    console.log(err.message);
  });
};

const { server, cloud_opts } = env;
const app = express();
const { sequelize } = db;

configure(config(app));

if (process.env.NODE_ENV !== 'test') {
  sequelize.sync().then(() => {
    app.listen(server[process.env.NODE_ENV], async () => {
      console.log(`Server running on port ${server[process.env.NODE_ENV]}`);
      await loadConfigAndRegisterWithEureka(cloud_opts, server[process.env.NODE_ENV]);
    });
  });
}

export default app;
