'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NODE_MODULES = exports.EXTENSIONS_PATH = undefined;

var _path = require('path');

var _environment = require('../environment');

var EXTENSIONS_PATH = exports.EXTENSIONS_PATH = (0, _path.resolve)(process.env.APP_PATH, 'extensions');
var NODE_MODULES = exports.NODE_MODULES = _environment.isDev ? (0, _path.resolve)(__dirname, '..', '..', 'node_modules') : (0, _path.resolve)(process.env.SDK_PATH, 'node_modules');