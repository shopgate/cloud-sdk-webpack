'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Returns the development configuration.
 * @return {Object} The development configuration.
 */
var getDevConfig = function getDevConfig() {
  var defaultConfig = {
    ip: '127.0.0.0',
    port: 8080,
    apiPort: 9666,
    hmrPort: 3000,
    remotePort: 8000,
    sourceMap: 'cheap-module-eval-source-map'
  };

  try {
    var appSettings = process.env.settings;
    var frontendSettings = appSettings.getFrontendSettings();

    return _extends({}, defaultConfig, {
      ip: frontendSettings.getIpAddress(),
      port: frontendSettings.getPort(),
      apiPort: frontendSettings.getApiPort(),
      hmrPort: frontendSettings.getHmrPort(),
      remotePort: frontendSettings.getRemotePort(),
      sourceMap: frontendSettings.getSourceMapsType()
    });
  } catch (e) {
    return defaultConfig;
  }
};

exports.default = getDevConfig;