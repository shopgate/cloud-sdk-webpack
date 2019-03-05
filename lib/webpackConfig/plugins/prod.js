'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compressionWebpackPlugin = require('compression-webpack-plugin');

var _compressionWebpackPlugin2 = _interopRequireDefault(_compressionWebpackPlugin);

var _workboxWebpackPlugin = require('workbox-webpack-plugin');

var _workboxWebpackPlugin2 = _interopRequireDefault(_workboxWebpackPlugin);

var _common = require('./common');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = [].concat(_toConsumableArray(_common2.default), [new _workboxWebpackPlugin2.default.GenerateSW({
  swDest: 'sw.js',
  clientsClaim: true,
  skipWaiting: true
}), new _compressionWebpackPlugin2.default({
  asset: '[path].gz[query]',
  algorithm: 'gzip',
  test: /\.js$|\.css$/,
  minRatio: 0.8
})]);