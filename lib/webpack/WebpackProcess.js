const webpack = require('webpack');
const rimraf = require('rimraf');
const WebpackConfigurator = require('../webpackConfig/WebpackConfigurator');
const themes = require('../Themes');
const createIndexes = require('../helpers/indexes');
const logger = require('../logger');

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
      logger.logHelper.logLogoBuild();

      createIndexes()
        .then(() => {
          if (process.env.indexOnly === 'true') {
            process.exit(0);
            return;
          }

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

    const output = stats.toString({
      colors: true,
      warnings: true,
      chunks: true,
    });

    this.logger.log(output);

    if (stats.hasErrors()) {
      throw new Error(output);
    }

    logger.logHelper.logBuildFinished();
  }
}

module.exports = new WebpackProcess();
