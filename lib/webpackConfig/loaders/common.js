'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

exports.default = function (nodeModules) {
  return [{
    test: /\.css$/,
    use: [(0, _path.resolve)(nodeModules, 'style-loader'), (0, _path.resolve)(nodeModules, 'css-loader')]
  }, {
    test: /\.json$/,
    use: [(0, _path.resolve)(nodeModules, 'json-loader')]
  }, {
    test: /\.svg$/,
    use: [(0, _path.resolve)(nodeModules, 'svg-inline-loader')]
  }, {
    test: /\.ejs$/,
    use: [(0, _path.resolve)(nodeModules, 'ejs-loader')]
  }, {
    test: /worker\.js$/,
    use: [(0, _path.resolve)(nodeModules, 'worker-loader')]
  }];
};