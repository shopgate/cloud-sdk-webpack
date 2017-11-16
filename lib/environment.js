'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ENV_KEY_DEVELOPMENT = exports.ENV_KEY_DEVELOPMENT = 'development';
var ENV_KEY_PRODUCTION = exports.ENV_KEY_PRODUCTION = 'production';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = ENV_KEY_DEVELOPMENT;
}

var ENV = exports.ENV = process.env.NODE_ENV;
var isProd = exports.isProd = process.env.NODE_ENV === ENV_KEY_PRODUCTION;
var isDev = exports.isDev = process.env.NODE_ENV === ENV_KEY_DEVELOPMENT;