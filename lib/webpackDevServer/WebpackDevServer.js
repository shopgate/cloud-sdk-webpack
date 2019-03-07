const webpack = require('webpack');
const WpDevServer = require('webpack-dev-server');
const merge = require('webpack-merge');
const fs = require('fs');
const WebpackConfigurator = require('../webpackConfig/WebpackConfigurator');
const createIndexes = require('../helpers/indexes');
const themes = require('../Themes');
const logger = require('../logger');

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

    this.startDevServer = this.startDevServer.bind(this);
    this.handleIndexerErrors = this.handleIndexerErrors.bind(this);
  }

  /**
   * Starts the webpack processes.
   */
  start() {
    themes.init(() => {
      logger.log('');

      createIndexes()
        .then(this.startDevServer)
        .catch(this.handleIndexerErrors);
    });
  }

  /**
   * Starts the actual webpack dev server.
   */
  startDevServer() {
    logger.log('');

    this.configurator
      .setConfigPath(themes.getConfig())
      .loadThemeConfig();

    logger.logHelper.logLogoStart();

    this.webpackConfig = this.configurator.getConfig();
    this.serverConfig = this.configurator.getServerConfig();

    /**
     * At this point we need to merge the modules resolving paths with our default
     * webpack config. This is because if it is not included in a custom webpack config
     * then the modules will not be resolved from the correct places.
     */
    this.injectModuleResolves();

    WpDevServer.addDevServerEntrypoints(this.webpackConfig, this.serverConfig);

    this.compiler = webpack(this.webpackConfig);
    this.server = new WpDevServer(this.compiler, this.serverConfig);

    const { host, port } = this.serverConfig;

    this.server.listen(port, host);

    // Set up a watcher for the config files.
    fs.watch(`${themes.getPath()}/config/components.json`, () => {
      createIndexes().catch(this.handleIndexerErrors);
    });
  }

  /**
   * Handles any error that occurs in the indexer.
   * @param {string|Object} error The error from the indexer.
   */
  handleIndexerErrors(error) { // eslint-disable-line class-methods-use-this
    logger.log(error);
    process.exit(1);
  }

  /**
   * Injects the module resolve paths from the common webpack configuration.
   */
  injectModuleResolves() {
    this.webpackConfig = merge(this.webpackConfig, {
      resolve: {
        // eslint-disable-next-line global-require
        modules: require('../webpack.config').resolve.modules,
      },
    });
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

module.exports = new WebpackDevServer();
