'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _variables = require('../variables');

var _Themes = require('../../Themes');

var _Themes2 = _interopRequireDefault(_Themes);

var _common = require('./common');

var _common2 = _interopRequireDefault(_common);

var _stringReplacementLoader = require('./stringReplacementLoader');

var _stringReplacementLoader2 = _interopRequireDefault(_stringReplacementLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = [].concat(_toConsumableArray((0, _common2.default)(_variables.NODE_MODULES)), [{
  test: /\.(js|jsx)$/,
  exclude: [(0, _path.resolve)(process.env.SDK_PATH), (0, _path.resolve)(process.env.SDK_PATH, 'bin')],
  use: [_stringReplacementLoader2.default, (0, _path.resolve)(_variables.NODE_MODULES, 'cache-loader'), {
    loader: (0, _path.resolve)(_variables.NODE_MODULES, 'babel-loader'),
    options: {
      compact: true,
      comments: true,
      sourceRoot: _Themes2.default.getPath(),
      cacheDirectory: true,
      extends: (0, _path.resolve)(_Themes2.default.getPath(), '.babelrc')
    }
  }]
}]);