/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import webpack from 'webpack';
import WpDevServer from 'webpack-dev-server';
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

    this.init();
  }

  /**
   * Creates all the necessary elements.
   */
  init() {
    this.configurator
      .setConfigPath(themes.getConfig())
      .loadThemeConfig();

    logHelper.logLogoStart();
    this.webpackConfig = this.configurator.getConfig();
    this.serverConfig = this.configurator.getServerConfig();
    this.compiler = webpack(this.webpackConfig);
    this.server = new WpDevServer(this.compiler, this.serverConfig);
  }

  /**
   * Starts the webpack dev server instance.
   */
  start() {
    const { host, port } = this.serverConfig;

    this.server.listen(port, host);
  }
}

export default new WebpackDevServer();
