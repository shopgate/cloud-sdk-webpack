/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import webpack from 'webpack';
import rimraf from 'rimraf';
import WebpackConfigurator from 'Src/webpackConfig/WebpackConfigurator';
import themes from 'Src/Themes';
import createIndexes from 'Src/webpackConfig/helpers/indexes';
import logger, { logHelper } from 'Src/logger';

/**
 * The Webpack process class.
 */
class WebpackProcess {
  /**
   * WebpackProcess.
   */
  constructor() {
    this.configurator = new WebpackConfigurator();
    this.webpackConfig = null;
    this.compiler = null;
    this.logger = logger;
  }

  /**
   * Starts the Webpack compiler.
   */
  start() {
    themes.init(() => {
      // Log startup logo.
      logHelper.logLogoBuild();

      createIndexes()
        .then(() => {
          logger.log('');

          this.configurator
            .setConfigPath(themes.getConfig())
            .loadThemeConfig();

          this.webpackConfig = this.configurator.getConfig();
          this.compiler = webpack(this.webpackConfig);

          // Clear previous build.
          rimraf(this.webpackConfig.output.path, () => {
            // Run webpack.
            this.compiler.run(this.handleOutput.bind(this));
          });
        });
    });
  }

  /**
   * Handles the Webpack console output.
   * @param {Object} err A node process error.
   * @param {Object} stats The webpack compilation output.
   */
  handleOutput(err, stats) {
    if (err) {
      this.logger.error(err.stack || err);

      if (err.details) {
        this.logger.error(err.details);
      }

      throw new Error(err);
    }

    if (stats.hasErrors()) {
      throw new Error(stats.toString({
        colors: true,
        warnings: false,
        chunks: false,
      }));
    }

    logHelper.logBuildFinished();
  }
}

export default new WebpackProcess();
