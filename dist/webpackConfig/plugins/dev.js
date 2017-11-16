'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _common = require('./common');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
                                                                                                                                                                                                     *
                                                                                                                                                                                                     * This source code is licensed under the Apache 2.0 license found in the
                                                                                                                                                                                                     * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                     */

exports.default = [].concat(_toConsumableArray(_common2.default), [new _webpack2.default.HotModuleReplacementPlugin(), new _webpack2.default.NoEmitOnErrorsPlugin()]);