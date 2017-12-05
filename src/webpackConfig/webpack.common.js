/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { resolve } from 'path';
import { EXTENSIONS_PATH, NODE_MODULES } from './variables';
import convertLanguageToISO from './helpers/convertLanguageToISO';
import getAppSettings from './helpers/getAppSettings';
import themes from '../Themes';
import getExtensionsNodeModulesPaths from './helpers/getExtensionsNodeModulesPaths';

const { language } = getAppSettings();

export default {
  context: resolve(themes.getPath()),
  devServer: {
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    publicPath: '/',
    contentBase: resolve(themes.getPath(), 'public'),
    progress: true,
  },
  entry: {
    common: [
      resolve(NODE_MODULES, 'babel-polyfill'),
      resolve(NODE_MODULES, 'intl'),
      resolve(NODE_MODULES, `intl/locale-data/jsonp/${convertLanguageToISO(language)}.js`),
      'react',
      'react-dom',
      resolve(__dirname, './helpers/polyfill'),
    ],
  },
  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    modules: [
      resolve(themes.getPath(), 'node_modules'),
      resolve(themes.getPath(), 'widgets'),
      resolve(EXTENSIONS_PATH),
      ...getExtensionsNodeModulesPaths(),
      resolve(NODE_MODULES),
    ],
  },
  performance: {
    hints: false,
  },
  target: 'web',
  watchOptions: {
    ignored: /node_modules\b(?!\/@shopgate)\b.*/,
  },
};
