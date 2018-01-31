'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // add your config here
  config.cluster = {
    listen: {
      port: 8001,
    },
  };

  config.logger = {
    // level: 'DEBUG',
    // consoleLevel: 'DEBUG',
  };

  return config;
};
