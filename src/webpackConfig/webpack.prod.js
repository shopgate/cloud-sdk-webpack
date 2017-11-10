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

const THEME_PATH = themes.getPath();

export default merge(common, {
  entry: {
    app: [
      resolve(THEME_PATH, 'index.jsx'),
      resolve(__dirname, './modules/cache'),
    ],
  },
  devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: resolve(THEME_PATH, 'public'),
    publicPath: './',
  },
  plugins,
  stats: 'errors-only',
});
