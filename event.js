/**
 * Copyright (c) 2018, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const event = require('./lib/event');

exports.THEME_IS_SET = event.THEME_IS_SET;
exports.THEME_CONFIG_READY = event.THEME_CONFIG_READY;
exports.onThemeIsSet = event.onThemeIsSet;
exports.onThemeConfigReady = event.onThemeConfigReady;

module.exports = event.default;
