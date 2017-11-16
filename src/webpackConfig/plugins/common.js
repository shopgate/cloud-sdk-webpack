/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { resolve } from 'path';
import { blue, green } from 'chalk';
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import StringReplacePlugin from 'string-replace-webpack-plugin';
import ProgressBarWebpackPlugin from 'progress-bar-webpack-plugin';
import themes from '../../Themes';
import convertLanguageToISO from '../helpers/convertLanguageToISO';
import getAppSettings from '../helpers/getAppSettings';
import getComponentsSettings from '../helpers/getComponentsSettings';
import getDevConfig from '../helpers/getDevConfig';
import { ENV, isDev, isProd } from '../../environment';

const appConfig = getAppSettings();
const componentsConfig = getComponentsSettings();
const { ip, apiPort } = getDevConfig();

const THEME_PATH = themes.getPath();
const THEME_NAME = themes.getName();
const PUBLIC_FOLDER = 'public';
const LANG = convertLanguageToISO(appConfig.language);

const plugins = [
  new StringReplacePlugin(),
  new HTMLWebpackPlugin({
    title: appConfig.shopName || THEME_NAME,
    filename: resolve(THEME_PATH, PUBLIC_FOLDER, 'index.html'),
    template: resolve(__dirname, '../templates/index.ejs'),
    inject: false,
    cache: false,
    minify: false,
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(ENV),
      APP_CONFIG: JSON.stringify(appConfig),
      COMPONENTS_CONFIG: JSON.stringify(componentsConfig),
      LANG: JSON.stringify(LANG),
      IP: JSON.stringify(ip),
      PORT: JSON.stringify(apiPort),
    },
  }),
  new webpack.LoaderOptionsPlugin({
    debug: isDev,
    options: {
      context: THEME_PATH,
      output: {
        path: resolve(THEME_PATH, PUBLIC_FOLDER),
      },
    },
  }),
  new webpack.IgnorePlugin(),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    minChunks: 2,
    name: 'common',
    filename: isProd ? '[name].[chunkhash].js' : '[name].js',
  }),
  new webpack.HashedModuleIdsPlugin(),
  new ProgressBarWebpackPlugin({
    format: `  building [${blue(':bar')}] [:msg] ${green(':percent')} (:elapsed seconds)`,
    clear: false,
  }),
];

export default plugins;
