/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CompressionWebpackPlugin from 'compression-webpack-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';
import commonPlugins from './common';

export default [
  ...commonPlugins,
  new WorkboxPlugin.GenerateSW({
    swDest: 'sw.js',
    clientsClaim: true,
    skipWaiting: true,
  }),
  new CompressionWebpackPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$/,
    minRatio: 0.8,
  }),
];
