/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { resolve } from 'path';
import webpack from 'webpack';
import WpDevServer from 'webpack-dev-server';
import merge from 'webpack-merge';
import WebpackConfigurator from 'Src/webpackConfig/WebpackConfigurator';
import createIndexes from 'Src/webpackConfig/helpers/indexes';
import themes from 'Src/Themes';
import logger, { logHelper } from 'Src/logger';
import { isDev } from 'Src/environment';

/**
 * The WebpackDevServer class.
 */
class WebpackDevServer {
  /**
   * WebpackDevServer.
   */
  constructor() {
    this.configurator = new WebpackConfigurator();
    this.webpackConfig = null;
    this.serverConfig = null;
    this.compiler = null;
    this.server = null;
  }

  /**
   * Starts the webpack dev server instance.
   */
  start() {
    themes.init(() => {
      logger.log('');

      createIndexes()
        .then(() => {
          logger.log('');

          this.configurator
            .setConfigPath(themes.getConfig())
            .loadThemeConfig();

          logHelper.logLogoStart();

          this.webpackConfig = this.configurator.getConfig();
          this.serverConfig = this.configurator.getServerConfig();

          /**
           * At this point we need to merge the modules resolving paths with our default
           * webpack config. This is because if it is not included in a custom webpack config
           * then the modules will not be resolved from the correct places.
           */
          this.injectModuleResolves();
          this.extendEntry();

          WpDevServer.addDevServerEntrypoints(this.webpackConfig, this.serverConfig);

          this.compiler = webpack(this.webpackConfig);
          this.server = new WpDevServer(this.compiler, this.serverConfig);

          const { host, port } = this.serverConfig;

          this.server.listen(port, host);
        })
        .catch((error) => {
          logger.log(error);
          process.exit(1);
        });
    });
  }

  /**
   * Injects the module resolve paths from the common webpack configuration.
   */
  injectModuleResolves() {
    this.webpackConfig = merge(this.webpackConfig, {
      resolve: {
        // eslint-disable-next-line global-require
        modules: require('../webpackConfig/webpack.common').default.resolve.modules,
      },
    });
  }

  /**
   * Extends the app entry with the react hot loader in development.
   */
  extendEntry() {
    // This is for development only.
    if (!isDev) {
      return;
    }

    // The resolved react-hot-loader path.
    const hotLoaderPatch = resolve(process.env.SDK_PATH, 'node_modules', 'react-hot-loader/patch');
    // The current entry configuration.
    const entry = this.getEntry();

    // Check if the react-hot-loader is already implemented.
    if (entry.includes(hotLoaderPatch)) {
      return;
    }

    // Inject the react hot loader.
    // IMPORTANT: Needs to be the first entry in the array.
    this.webpackConfig.entry.app = [
      hotLoaderPatch,
      ...entry,
    ];
  }

  /**
   * Returns the app entry and sanitizes it.
   * @return {Array}
   */
  getEntry() {
    return Array.isArray(this.webpackConfig.entry.app)
      ? this.webpackConfig.entry.app
      : [this.webpackConfig.entry.app];
  }
}

export default new WebpackDevServer();
