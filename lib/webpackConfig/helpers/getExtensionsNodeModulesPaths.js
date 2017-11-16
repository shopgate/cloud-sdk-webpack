'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _Themes = require('../../Themes');

var _Themes2 = _interopRequireDefault(_Themes);

var _getAppSettings2 = require('./getAppSettings');

var _getAppSettings3 = _interopRequireDefault(_getAppSettings2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _getAppSettings = (0, _getAppSettings3.default)(),
    extensions = _getAppSettings.extensions;

var getExtensionsNodeModulePaths = function getExtensionsNodeModulePaths() {
  return extensions.map(function (name) {
    return (0, _path.join)(_Themes2.default.getPath(), 'extensions', name, 'frontend', 'node_modules');
  });
};

exports.default = getExtensionsNodeModulePaths;