'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringReplaceWebpackPlugin = require('string-replace-webpack-plugin');

var _stringReplaceWebpackPlugin2 = _interopRequireDefault(_stringReplaceWebpackPlugin);

var _Themes = require('../../Themes');

var _Themes2 = _interopRequireDefault(_Themes);

var _variables = require('../variables');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stringReplacementLoader = _stringReplaceWebpackPlugin2.default.replace({
  replacements: [{
    pattern: /__THEME_PATH__/g,
    replacement: function replacement() {
      return JSON.stringify(_Themes2.default.getPath());
    }
  }, {
    pattern: /__EXTENSIONS_PATH__/g,
    replacement: function replacement() {
      return JSON.stringify(_variables.EXTENSIONS_PATH);
    }
  }]
});

exports.default = stringReplacementLoader;