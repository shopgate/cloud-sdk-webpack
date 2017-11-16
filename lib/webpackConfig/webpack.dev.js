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

var _dev = require('./plugins/dev');

var _dev2 = _interopRequireDefault(_dev);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var THEME_PATH = _Themes2.default.getPath();

exports.default = (0, _webpackMerge2.default)(_webpack2.default, {
  entry: {
    app: ['./index.jsx']
  },
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
    path: (0, _path.resolve)(THEME_PATH, 'public'),
    publicPath: '/'
  },
  plugins: _dev2.default,
  stats: 'normal'
});