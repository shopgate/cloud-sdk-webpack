/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import webpack from 'webpack';
import WpDevServer from 'webpack-dev-server';
import merge from 'webpack-merge';
import WebpackConfigurator from 'Src/webpackConfig/WebpackConfigurator';
import themes from 'Src/Themes';
import { logHelper } from 'Src/logger';

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
      this.configurator
        .setConfigPath(themes.getConfig())
        .loadThemeConfig();

      logHelper.logLogoStart();

      /**
       * At this point we need to merge the modules resolving paths with our default webpack config.
       * This is because if it is not included in a custom webpack config then the modules will
       * not be resolved from the correct places.
       */
      this.webpackConfig = merge(this.configurator.getConfig(), {
        resolve: {
          modules: require('../webpackConfig/webpack.common').default.resolve.modules, // eslint-disable-line global-require
        },
      });

      this.serverConfig = this.configurator.getServerConfig();

      WpDevServer.addDevServerEntrypoints(this.webpackConfig, this.serverConfig);

      this.compiler = webpack(this.webpackConfig);
      this.server = new WpDevServer(this.compiler, this.serverConfig);

      const { host, port } = this.serverConfig;

      this.server.listen(port, host);
    });
  }
}

export default new WebpackDevServer();
