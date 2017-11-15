/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { resolve } from 'path';
import StringReplacePlugin from 'string-replace-webpack-plugin';
import convertLanguageToISO from './helpers/convertLanguageToISO';
import getExtensionsNodeModulesPaths from './helpers/getExtensionsNodeModulesPaths';
import { isDev } from '../environment';
import themes from '../Themes';

const THEME_PATH = themes.getPath();
const LANG = convertLanguageToISO(process.env.settings.language);
const NODE_MODULES = 'node_modules';
const LOCAL_NODE_MODULES = resolve(__dirname, '..', '..', NODE_MODULES);
const SDK_NODE_MODULES = resolve(process.env.SDK_PATH, NODE_MODULES);

const stringReplacementLoader = StringReplacePlugin.replace({
  replacements: [{
    pattern: /__PROJECT_PATH__/g,
    replacement: () => JSON.stringify(THEME_PATH),
  }],
});

export default {
  context: resolve(THEME_PATH),
  devServer: {
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    publicPath: '/',
    contentBase: resolve(THEME_PATH, 'public'),
    progress: true,
  },
  entry: {
    common: [
      resolve(SDK_NODE_MODULES, 'babel-polyfill'),
      resolve(SDK_NODE_MODULES, 'intl'),
      resolve(SDK_NODE_MODULES, `intl/locale-data/jsonp/${LANG}.js`),
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
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          resolve(SDK_NODE_MODULES, 'style-loader'),
          resolve(SDK_NODE_MODULES, 'css-loader'),
        ],
      },
      {
        test: /\.json$/,
        use: [
          resolve(SDK_NODE_MODULES, 'json-loader'),
        ],
      },
      {
        test: /\.svg$/,
        use: [
          resolve(SDK_NODE_MODULES, 'svg-inline-loader'),
        ],
      },
      {
        test: /\.ejs/,
        use: [
          resolve(SDK_NODE_MODULES, 'ejs-loader'),
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [
          resolve(process.env.SDK_PATH),
          resolve(process.env.SDK_PATH, 'bin'),
        ],
        use: [
          stringReplacementLoader,
          'cache-loader',
          {
            loader: resolve(SDK_NODE_MODULES, 'babel-loader'),
            options: {
              compact: true,
              comments: !!isDev,
              sourceRoot: THEME_PATH,
              cacheDirectory: !isDev,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    modules: [
      resolve(THEME_PATH, NODE_MODULES),
      resolve(SDK_NODE_MODULES),
      resolve(LOCAL_NODE_MODULES),
      ...getExtensionsNodeModulesPaths(),
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
