'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1516694643431_7736';

  // add your config here
  config.cluster = {
    listen: {
      port: 8001,
    },
  };

  // config.middleware = [ ];
  config.errorMongo = {
    details: true,
  };
  config.errorHanler = {
    details: true,
  };

  // mongoose config
  config.mongoose = {
    // url: 'mongodb://root:Ziyouyanfa%23%40!@localhost:27017/naf?authSource=admin',
    url: 'mongodb://localhost:27017/naf?authSource=admin',
    options: {
      user: 'root',
      pass: 'Ziyouyanfa#@!',
      authSource: 'admin',
    },
  };

  config.logger = {
    // level: 'DEBUG',
    consoleLevel: 'DEBUG',
  };

  return config;
};
