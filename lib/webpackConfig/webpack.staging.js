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

var _staging = require('./plugins/staging');

var _staging2 = _interopRequireDefault(_staging);

var _staging3 = require('./loaders/staging');

var _staging4 = _interopRequireDefault(_staging3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _webpackMerge2.default)(_webpack2.default, {
  entry: {
    app: ['./index.jsx']
  },
  module: {
    rules: _staging4.default
  },
  devtool: false,
  output: {
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
    path: (0, _path.resolve)(_Themes2.default.getPath(), 'public'),
    publicPath: '/'
  },
  plugins: _staging2.default,
  stats: 'normal'
});