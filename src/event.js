/**
 * Copyright (c) 2018, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import EventEmitter from 'events';

const event = new EventEmitter();

export const THEME_IS_SET = 'THEME_IS_SET';
export const THEME_CONFIG_READY = 'THEME_CONFIG_READY';

/**
 * Adds an callback to the 'THEME_IS_SET' event.
 * @param {Function} callback The callback to add.
 */
export const onThemeIsSet = (callback) => {
  event.addListener(THEME_IS_SET, callback);
};

/**
 * Adds an callback to the 'THEME_CONFIG_READY' event.
 * @param {Function} callback The callback to add.
 */
export const onThemeConfigReady = (callback) => {
  event.addListener(THEME_CONFIG_READY, callback);
};

export default event;
