'use strict';

module.exports = () => {
  const config = exports = {};

  config.cluster = {
    listen: {
      port: 8002,
    },
  };

  // mongoose config
  config.mongoose = {
    url: 'mongodb://192.168.18.100:27018/naf',
    // url: 'mongodb://192.168.1.170:27018/naf',
  };

  config.logger = {
    consoleLevel: 'DEBUG',
  };

  return config;
};
