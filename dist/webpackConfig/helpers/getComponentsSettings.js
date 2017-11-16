'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _requireUncached = require('require-uncached');

var _requireUncached2 = _interopRequireDefault(_requireUncached);

var _Themes = require('../../Themes');

var _Themes2 = _interopRequireDefault(_Themes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the app settings from the remote project.
 * @return {Object} The app settings.
 */
/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

var getComponentsSettings = function getComponentsSettings() {
  try {
    return (0, _requireUncached2.default)(_Themes2.default.getPath() + '/config/components.json');
  } catch (e) {
    return {};
  }
};

exports.default = getComponentsSettings;