/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { resolve } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
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
      'babel-polyfill',
      'intl',
      `intl/locale-data/jsonp/${convertLanguageToISO(language)}.js`,
      'react',
      'react-dom',
      'lodash',
      'swiper',
      'glamor',
      'react-redux',
      'react-helmet',
      'recompose',
      'rxjs',
      'reselect',
      'gsap',
      'hammerjs',
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
      resolve(themes.getPath(), '..', '..', 'node_modules'),
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
  optimization: {
    usedExports: true,
    sideEffects: true,
    namedModules: true,
    namedChunks: true,
    nodeEnv: process.env.NODE_ENV,
    removeAvailableModules: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /node_modules/,
          name: 'common',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        parallel: false,
        extractComments: false,
        terserOptions: {
          ecma: 5,
          keep_fnames: false,
          mangle: true,
          sourceMap: false,
          safari10: false,
          toplevel: false,
          warnings: false,
          output: {
            comments: false,
          },
          parse: {
            shebang: false,
          },
          compress: {
            passes: 3,
            keep_fargs: false,
          },
        },
      }),
    ],
  },
};
