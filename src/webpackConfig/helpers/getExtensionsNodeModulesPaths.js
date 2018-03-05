/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { existsSync } from 'fs';
import { resolve } from 'path';
import { EXTENSIONS_PATH } from '../variables';

const extensions = JSON.parse(process.env.extensions);

/**
 * Returns the node modules paths to all extensions.
 * @return {Array}
 */
const getExtensionsNodeModulePaths = () => {
  const paths = [];

  Object.keys(extensions).forEach((key) => {
    const extension = extensions[key];
    const frontendPath = resolve(EXTENSIONS_PATH, extension.path, 'frontend', 'node_modules');

    if (existsSync(frontendPath)) {
      paths.push(frontendPath);
      return;
    }

    paths.push(resolve(EXTENSIONS_PATH, extension.path, 'node_modules'));
  });

  return paths;
};

export default getExtensionsNodeModulePaths;
