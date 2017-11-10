/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fork } from 'child_process';
import { join } from 'path';

try {
  fork(join(__dirname, './webpack'));
} catch (error) {
  throw error;
}
