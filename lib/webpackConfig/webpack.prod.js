'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _webpackMerge = require('webpack-merge');

var _webpackMerge2 = _interopRequireDefault(_webpackMerge);

var _Themes = require('../Themes');

var _Themes2 = _interopRequireDefault(_Themes);

var _webpack = require('./webpack.common');

var _webpack2 = _interopRequireDefault(_webpack);

var _prod = require('./plugins/prod');

var _prod2 = _interopRequireDefault(_prod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var THEME_PATH = _Themes2.default.getPath();

exports.default = (0, _webpackMerge2.default)(_webpack2.default, {
  entry: {
    app: [(0, _path.resolve)(THEME_PATH, 'index.jsx'), (0, _path.resolve)(__dirname, './modules/cache')]
  },
  devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: (0, _path.resolve)(THEME_PATH, 'public'),
    publicPath: './'
  },
  plugins: _prod2.default,
  stats: 'errors-only'
});