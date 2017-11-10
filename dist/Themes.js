'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This source code is licensed under the Apache 2.0 license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _fs = require('fs');

var _path = require('path');

var _environment = require('./environment');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The Themes class.
 */
var Themes = function () {
  /**
   * Themes.
   */
  function Themes() {
    _classCallCheck(this, Themes);

    this.currentTheme = null;
    this.themes = this.findThemes();
    this.setCurrentTheme();
  }

  /**
   * Returns the current theme.
   * @return {Object}
   */


  _createClass(Themes, [{
    key: 'getCurrentTheme',
    value: function getCurrentTheme() {
      return this.currentTheme;
    }

    /**
     * Returns the current theme path.
     * @return {string}
     */

  }, {
    key: 'getPath',
    value: function getPath() {
      return this.getCurrentTheme().path;
    }

    /**
     * Returns the current theme name.
     * @return {string}
     */

  }, {
    key: 'getName',
    value: function getName() {
      return this.getCurrentTheme().name;
    }

    /**
     * Returns the current theme's Webpack configuration.
     * @return {Object}
     */

  }, {
    key: 'getConfig',
    value: function getConfig() {
      return this.getCurrentTheme().config;
    }

    /**
     * Returns all themes.
     * @return {Array}
     */

  }, {
    key: 'getThemes',
    value: function getThemes() {
      return this.themes;
    }

    /**
     * Finds the current theme based on the process environment variables 'theme'.
     * @return {Themes}
     */

  }, {
    key: 'setCurrentTheme',
    value: function setCurrentTheme() {
      this.currentTheme = this.themes.filter(function (theme) {
        return process.env.theme === theme.name;
      })[0];
      return this;
    }

    /**
     * Find all themes inside the project.
     * @returns {Array}
     */

  }, {
    key: 'findThemes',
    value: function findThemes() {
      var _this = this;

      // Absolute path to the themes.
      var source = process.env.PWD + '/themes';

      // Get all folders inside the themes directory.
      var folders = (0, _fs.readdirSync)(source).filter(function (folder) {
        return (0, _fs.lstatSync)((0, _path.join)(source, folder)).isDirectory();
      });

      // Build a nice array of themes and their respective configs.
      return folders.map(function (name) {
        // The absolute path to this theme.
        var themePath = (0, _path.join)(source, name);

        return {
          name: name,
          path: themePath,
          config: _this.findWebpackConfig(themePath)
        };
      });
    }

    /**
     * Attempt to find a webpack.config.js inside the theme.
     * When a config is not found then a default is used.
     * @param {string} path The path to look for a config.
     * @returns {string} A path to a Webpack config
     */

  }, {
    key: 'findWebpackConfig',
    value: function findWebpackConfig(path) {
      // eslint-disable-line class-methods-use-this
      var themeConfig = (0, _path.join)(path, 'webpack.config.js');

      if ((0, _fs.existsSync)(themeConfig)) {
        return themeConfig;
      }

      var configFile = _environment.isProd ? 'webpack.prod.js' : 'webpack.dev.js';

      return (0, _path.join)(__dirname, './webpackConfig/' + configFile);
    }
  }]);

  return Themes;
}();

exports.default = new Themes();