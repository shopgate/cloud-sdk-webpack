/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { resolve } from 'path';
import getNodeModulesPath from './helpers/getNodeModulesPath';

export const EXTENSIONS_PATH = resolve(process.env.APP_PATH, 'extensions');
export const NODE_MODULES = getNodeModulesPath();
