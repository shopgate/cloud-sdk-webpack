'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _path = require('path');

var _variables = require('../variables');

var _getAppSettings2 = require('./getAppSettings');

var _getAppSettings3 = _interopRequireDefault(_getAppSettings2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _getAppSettings = (0, _getAppSettings3.default)(),
    _getAppSettings$exten = _getAppSettings.extensions,
    extensions = _getAppSettings$exten === undefined ? [] : _getAppSettings$exten;

var getExtensionsNodeModulePaths = function getExtensionsNodeModulePaths() {
  return extensions.map(function (name) {
    var frontendPath = (0, _path.resolve)(_variables.EXTENSIONS_PATH, name, 'frontend', 'node_modules');

    if ((0, _fs.existsSync)(frontendPath)) {
      return frontendPath;
    }

    return (0, _path.resolve)(_variables.EXTENSIONS_PATH, name, 'node_modules');
  });
};

exports.default = getExtensionsNodeModulePaths;