/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { join } from 'path';
import themes from '../../Themes';
import getAppSettings from './getAppSettings';

const { extensions } = getAppSettings();

/**
 * Returns the node modules paths to all extensions.
 * @return {Array}
 */
const getExtensionsNodeModulePaths = () => (
  extensions.map(name => join(themes.getPath(), 'extensions', name, 'frontend', 'node_modules'))
);

export default getExtensionsNodeModulePaths;
