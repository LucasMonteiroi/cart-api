/* eslint-disable no-underscore-dangle */
require('dotenv/config');
const { config } = require('dotenv');
const path = require('path');

module.exports = function configureEnvironment() {
  config();
  let _path;
  switch (process.env.NODE_ENV) {
    case 'production':
      _path = path.resolve(__dirname, '..', '..', '.env.prod');
      break;
    case 'docker':
      _path = path.resolve(__dirname, '..', '..', '.env');
      break;
    default:
      _path = path.resolve(__dirname, '..', '..', '.env.dev');
  }

  return config({ path: _path });
};
