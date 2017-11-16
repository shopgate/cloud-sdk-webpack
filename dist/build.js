'use strict';

var _child_process = require('child_process');

var _path = require('path');

/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

try {
  (0, _child_process.fork)((0, _path.join)(__dirname, './webpack'));
} catch (error) {
  throw error;
}