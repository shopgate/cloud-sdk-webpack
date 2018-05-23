/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { resolve } from 'path';

/**
 * Returns the common loaders.
 * @param {string} nodeModules Path to the node_modules.
 * @return {Array}
 */
export default nodeModules => [
  {
    test: /\.css$/,
    use: [
      resolve(nodeModules, 'style-loader'),
      resolve(nodeModules, 'css-loader'),
    ],
  },
  {
    test: /\.json$/,
    use: [
      resolve(nodeModules, 'json-loader'),
    ],
  },
  {
    test: /\.svg$/,
    use: [
      resolve(nodeModules, 'svg-inline-loader'),
    ],
  },
  {
    test: /\.ejs$/,
    use: [
      resolve(nodeModules, 'ejs-loader'),
    ],
  },
  {
    test: /worker\.js$/,
    use: [
      resolve(nodeModules, 'worker-loader'),
    ],
  },
];
