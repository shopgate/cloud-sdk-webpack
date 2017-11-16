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

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

var _WebpackConfigurator = require('../webpackConfig/WebpackConfigurator');

var _WebpackConfigurator2 = _interopRequireDefault(_WebpackConfigurator);

var _Themes = require('../Themes');

var _Themes2 = _interopRequireDefault(_Themes);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The Webpack process class.
 */
var WebpackProcess = function () {
  /**
   * WebpackProcess.
   */
  function WebpackProcess() {
    _classCallCheck(this, WebpackProcess);

    this.configurator = new _WebpackConfigurator2.default();
    this.webpackConfig = null;
    this.compiler = null;
    this.logger = _logger2.default;

    this.init();
  }

  /**
   * Sets up the process environment.
   */


  _createClass(WebpackProcess, [{
    key: 'init',
    value: function init() {
      this.configurator.setConfigPath(_Themes2.default.getConfig()).loadThemeConfig();

      this.webpackConfig = this.configurator.getConfig();
      this.compiler = (0, _webpack2.default)(this.webpackConfig);
    }

    /**
     * Starts the Webpack compiler.
     */

  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      // Log startup logo.
      _logger.logHelper.logLogoBuild();
      // Clear previous build.
      (0, _rimraf2.default)(this.webpackConfig.output.path, function () {
        // Run webpack.
        _this.compiler.run(_this.handleOutput);
      });
    }

    /**
     * Handles the Webpack console output.
     * @param {Object} err A node process error.
     * @param {Object} stats The webpack compilation output.
     */

  }, {
    key: 'handleOutput',
    value: function handleOutput(err, stats) {
      if (err) {
        this.logger.error(err.stack || err);

        if (err.details) {
          this.logger.error(err.details);
        }

        return;
      }

      if (stats.hasErrors()) {
        this.logger.log(stats.toString({
          colors: true,
          warnings: false,
          chunks: false
        }));

        return;
      }

      _logger.logHelper.logBuildFinished();
    }
  }]);

  return WebpackProcess;
}();

exports.default = new WebpackProcess();