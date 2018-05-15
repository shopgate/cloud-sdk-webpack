/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { resolve } from 'path';
import { NODE_MODULES } from '../variables';
import themes from '../../Themes';
import common from './common';
import stringReplacementLoader from './stringReplacementLoader';

export default [
  ...common(NODE_MODULES),
  {
    test: /\.(js|jsx)$/,
    exclude: [
      resolve(process.env.SDK_PATH),
      resolve(process.env.SDK_PATH, 'bin'),
    ],
    use: [
      stringReplacementLoader,
      resolve(NODE_MODULES, 'cache-loader'),
      {
        loader: resolve(NODE_MODULES, 'babel-loader'),
        options: {
          compact: true,
          comments: false,
          sourceRoot: themes.getPath(),
          cacheDirectory: true,
          extends: resolve(themes.getPath(), '.babelrc'),
        },
      },
    ],
  },
];
