'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _path = require('path');

var _variables = require('../variables');

var _logger = require('../../logger');

var _logger2 = _interopRequireDefault(_logger);

var _i18n = require('../../i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var t = (0, _i18n2.default)(__filename);

var extensions = {};

try {
  extensions = JSON.parse(process.env.extensions);
} catch (error) {
  _logger2.default.log(t('NO_EXTENSIONS_ATTACHED'));
}

var getExtensionsNodeModulePaths = function getExtensionsNodeModulePaths() {
  var paths = [];

  Object.keys(extensions).forEach(function (key) {
    var extension = extensions[key];
    var frontendPath = (0, _path.resolve)(_variables.EXTENSIONS_PATH, extension.path, 'frontend', 'node_modules');

    if ((0, _fs.existsSync)(frontendPath)) {
      paths.push(frontendPath);
      return;
    }

    paths.push((0, _path.resolve)(_variables.EXTENSIONS_PATH, extension.path, 'node_modules'));
  });

  return paths;
};

exports.default = getExtensionsNodeModulePaths;