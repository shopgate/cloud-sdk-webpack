/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { existsSync } from 'fs';
import { resolve } from 'path';
import { EXTENSIONS_PATH } from '../variables';
import getAppSettings from './getAppSettings';

const { extensions = [] } = getAppSettings();

/**
 * Returns the node modules paths to all extensions.
 * @return {Array}
 */
const getExtensionsNodeModulePaths = () => (
  extensions.map((name) => {
    const frontendPath = resolve(EXTENSIONS_PATH, name, 'frontend', 'node_modules');

    if (existsSync(frontendPath)) {
      return frontendPath;
    }

    return resolve(EXTENSIONS_PATH, name, 'node_modules');
  })
);

export default getExtensionsNodeModulePaths;
