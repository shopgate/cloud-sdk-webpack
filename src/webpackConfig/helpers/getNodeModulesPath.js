/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { existsSync } from 'fs';
import { resolve } from 'path';
import { isDev } from '../../environment';

/**
 * Returns the node_modules path.
 * @return {string}
 */
const getNodeModulesPath = () => {
  const envSdkPath = (process.env.SDK_PATH || '');
  const sdkPath = resolve(envSdkPath, 'node_modules');
  const localPath = resolve(__dirname, '..', '..', 'node_modules');

  if (!isDev) {
    return sdkPath;
  }

  if (!existsSync(resolve(localPath, 'babel-loader'))) {
    return sdkPath;
  }

  return localPath;
};

export default getNodeModulesPath;
