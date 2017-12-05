'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _path = require('path');

var _environment = require('../../environment');

var getNodeModulesPath = function getNodeModulesPath() {
  var sdkPath = (0, _path.resolve)(process.env.SDK_PATH, 'node_modules');
  var localPath = (0, _path.resolve)(__dirname, '..', '..', 'node_modules');

  if (!_environment.isDev) {
    return sdkPath;
  }

  if (!(0, _fs.existsSync)((0, _path.resolve)(localPath, 'babel-loader'))) {
    return sdkPath;
  }

  return localPath;
};

exports.default = getNodeModulesPath;