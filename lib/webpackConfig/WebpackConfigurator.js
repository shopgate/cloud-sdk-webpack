const logger = require('../logger');

/**
 * The WebpackConfigurator class.
 */
module.exports = class WebpackConfigurator {
  /**
   * WebpackConfigurator.
   */
  constructor() {
    /**
     * The default webpack dev server configuration.
     * @type {Object}
     */
    this.defaultServerConfig = {
      hot: true,
      host: process.env.optionsHost,
      port: process.env.optionsPort,
      progress: true,
      historyApiFallback: true,
      stats: {
        colors: true,
      },
    };

    /**
     * The webpack configuration.
     * @type {Object}
     */
    this.config = {};

    /**
     * The theme configuration path.
     * @type {string}
     */
    this.configPath = null;
  }

  /**
   * Sets the webpack config path.
   * @param {string} configPath The path to the webpack configuration.
   * @return {WebpackConfigurator}
   */
  setConfigPath(configPath) {
    try {
      this.configPath = configPath;
      return this;
    } catch (error) {
      logger.error('setConfigPath');
      throw error;
    }
  }

  /**
   * Loads the theme's webpack configuration.
   */
  loadThemeConfig() {
    try {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const config = require(this.configPath);
      // Check if coming from default export or module.exports
      this.config = config.default ? config.default : config;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Returns the theme configuration.
   * @return {Object}
   */
  getConfig() {
    return this.config;
  }

  /**
   * Returns the webpack devserver configuration.
   * @return {Object}
   */
  getServerConfig() {
    const themeDevConfig = this.config.devServer || {};

    // Combine all configs.
    return {
      ...this.defaultServerConfig,
      ...themeDevConfig,
    };
  }
};
