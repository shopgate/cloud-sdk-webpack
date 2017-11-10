'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _Themes = require('../../Themes');

var _Themes2 = _interopRequireDefault(_Themes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

var extensions = process.env.settings.getExtensions();
var path = _Themes2.default.getPath();

/**
 * Returns the node modules paths to all extensions.
 * @return {Array}
 */
var getExtensionsNodeModulePaths = function getExtensionsNodeModulePaths() {
  return extensions.map(function (name) {
    return (0, _path.join)(path, 'extensions', name, 'frontend', 'node_modules');
  });
};

exports.default = getExtensionsNodeModulePaths;