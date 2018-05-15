/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { resolve } from 'path';
import merge from 'webpack-merge';
import themes from '../Themes';
import common from './webpack.common';
import plugins from './plugins/staging';
import loaders from './loaders/staging';

export default merge(common, {
  entry: {
    app: [
      './index.jsx',
    ],
  },
  module: {
    rules: loaders,
  },
  devtool: false,
  output: {
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
    path: resolve(themes.getPath(), 'public'),
    publicPath: '/',
  },
  plugins,
  stats: 'normal',
});
