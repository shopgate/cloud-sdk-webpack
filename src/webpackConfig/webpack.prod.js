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
import plugins from './plugins/prod';
import loaders from './loaders/prod';

export default merge(common, {
  entry: {
    app: [
      resolve(__dirname, 'scripts', 'offline.js'),
      resolve(themes.getPath(), 'index.jsx'),
    ],
  },
  module: {
    noParse: function noParse(content) {
      return /localforage/.test(content);
    },
    rules: loaders,
  },
  devtool: false,
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: resolve(themes.getPath(), 'public'),
    publicPath: process.env.publicPath || './',
  },
  plugins,
  stats: 'errors-only',
});
