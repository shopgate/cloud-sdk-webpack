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

var _dev3 = require('./loaders/dev');

var _dev4 = _interopRequireDefault(_dev3);

var _getDevConfig2 = require('./helpers/getDevConfig');

var _getDevConfig3 = _interopRequireDefault(_getDevConfig2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _getDevConfig = (0, _getDevConfig3.default)(),
    sourceMap = _getDevConfig.sourceMap;

exports.default = (0, _webpackMerge2.default)(_webpack2.default, {
  entry: {
    app: ['./index.jsx']
  },
  module: {
    noParse: function noParse(content) {
      return (/localforage/.test(content)
      );
    },

    rules: _dev4.default
  },
  devtool: sourceMap,
  output: {
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
    path: (0, _path.resolve)(_Themes2.default.getPath(), 'public'),
    publicPath: '/'
  },
  plugins: _dev2.default,
  stats: 'normal'
});