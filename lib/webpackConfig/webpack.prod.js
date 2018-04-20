'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _webpackMerge = require('webpack-merge');

var _webpackMerge2 = _interopRequireDefault(_webpackMerge);

var _yargs = require('yargs');

var _Themes = require('../Themes');

var _Themes2 = _interopRequireDefault(_Themes);

var _webpack = require('./webpack.common');

var _webpack2 = _interopRequireDefault(_webpack);

var _prod = require('./plugins/prod');

var _prod2 = _interopRequireDefault(_prod);

var _prod3 = require('./loaders/prod');

var _prod4 = _interopRequireDefault(_prod3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var publicPath = _yargs.argv.publicPath || '.';

exports.default = (0, _webpackMerge2.default)(_webpack2.default, {
  entry: {
    app: [(0, _path.resolve)(__dirname, 'scripts', 'offline.js'), (0, _path.resolve)(_Themes2.default.getPath(), 'index.jsx')]
  },
  module: {
    rules: _prod4.default
  },
  devtool: false,
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: (0, _path.resolve)(_Themes2.default.getPath(), 'public'),
    publicPath: publicPath + '/'
  },
  plugins: _prod2.default,
  stats: 'errors-only'
});