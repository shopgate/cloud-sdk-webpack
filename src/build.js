/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fork } from 'child_process';
import { join } from 'path';

try {
  const webpackProcess = fork(join(__dirname, './webpack'));
  webpackProcess.on('exit', code => process.exit(code));
} catch (error) {
  throw error;
}
