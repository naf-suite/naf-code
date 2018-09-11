'use strict';

module.exports = () => {
  const config = exports = {};

  config.cluster = {
    listen: {
      port: 7002,
    },
  };

  config.logger = {
    consoleLevel: 'DEBUG',
  };

  return config;
};
