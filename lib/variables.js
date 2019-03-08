const path = require('path');
const getNodeModulesPath = require('./helpers/getNodeModulesPath');

exports.ENV_KEY_DEVELOPMENT = 'development';
exports.ENV_KEY_STAGING = 'staging';
exports.ENV_KEY_PRODUCTION = 'production';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = exports.ENV_KEY_DEVELOPMENT;
}

exports.ENV = process.env.NODE_ENV;
exports.isProd = (process.env.NODE_ENV === exports.ENV_KEY_PRODUCTION);
exports.isStaging = (process.env.NODE_ENV === exports.ENV_KEY_STAGING);
exports.isDev = (process.env.NODE_ENV === exports.ENV_KEY_DEVELOPMENT);

if (exports.isStaging) {
  process.env.BABEL_ENV = exports.ENV_KEY_PRODUCTION;
}

exports.DEFAULT_LANGUAGE = 'en-US';
exports.EXTENSIONS_PATH = path.resolve(process.cwd(), 'extensions');
exports.NODE_MODULES = getNodeModulesPath();
exports.PUBLIC_FOLDER = 'public';
