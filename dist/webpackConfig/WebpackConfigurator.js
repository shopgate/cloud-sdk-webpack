'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This source code is licensed under the Apache 2.0 license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The WebpackConfigurator class.
 */
var WebpackConfigurator = function () {
  /**
   * WebpackConfigurator.
   */
  function WebpackConfigurator() {
    _classCallCheck(this, WebpackConfigurator);

    /**
     * The default webpack dev server configuration.
     * @type {Object}
     */
    this.defaultServerConfig = {
      hot: true,
      host: process.env.optionsHost,
      port: process.env.optionsPort,
      progress: true,
      stats: {
        colors: true
      }
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


  _createClass(WebpackConfigurator, [{
    key: 'setConfigPath',
    value: function setConfigPath(configPath) {
      try {
        this.configPath = configPath;
        return this;
      } catch (error) {
        _logger2.default.error('setConfigPath');
        throw error;
      }
    }

    /**
     * Loads the theme's webpack configuration.
     */

  }, {
    key: 'loadThemeConfig',
    value: function loadThemeConfig() {
      try {
        // eslint-disable-next-line global-require, import/no-dynamic-require
        var config = require(this.configPath);
        // Check if comming from default export or module.exports
        this.config = config.default ? config.default : config;
      } catch (error) {
        throw error;
      }
    }

    /**
     * Returns the theme configuration.
     * @return {Object}
     */

  }, {
    key: 'getConfig',
    value: function getConfig() {
      return this.config;
    }

    /**
     * Returns the webpack devserver configuration.
     * @return {Object}
     */

  }, {
    key: 'getServerConfig',
    value: function getServerConfig() {
      var themeDevConfig = this.config.devServer || {};

      // Combine all configs.
      return _extends({}, this.defaultServerConfig, themeDevConfig);
    }
  }]);

  return WebpackConfigurator;
}();

exports.default = WebpackConfigurator;