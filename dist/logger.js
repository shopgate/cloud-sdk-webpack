'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logHelper = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This source code is licensed under the Apache 2.0 license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _chalk = require('chalk');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The Logger class hold static functions for logging useful information when running
 * the Rapid Dev Server and the Webpack Dev Server.
 * @type {LogHelper}
 */
var LogHelper = function () {
  /**
   * LogHelper.
   */
  function LogHelper() {
    _classCallCheck(this, LogHelper);

    /**
     * A divider for console outputs.
     * @type {string}
     */
    this.divider = '---------------------------------------------------------------------------\n';
    /**
     * A colored Shopgate Cloud prefix for console outputs.
     * @type {string}
     */
    this.prefix = '' + (0, _chalk.green)('Shopgate') + (0, _chalk.blue)('Cloud');

    this.logger = console;
  }

  /**
   * Returns the divider.
   * @return {string}
   */


  _createClass(LogHelper, [{
    key: 'getDivider',
    value: function getDivider() {
      return this.divider;
    }

    /**
     * Returns the Shopgate Cloud prefix
     * @return {string}
     */

  }, {
    key: 'getPrefix',
    value: function getPrefix() {
      return this.prefix;
    }

    /**
     * Logs the build logo.
     */

  }, {
    key: 'logLogoBuild',
    value: function logLogoBuild() {
      this.logger.log('\n' + this.getDivider());
      this.logger.log('  ' + (0, _chalk.green)('S H O P G A T E') + '   ' + (0, _chalk.blue)('C L O U D'));
      this.logger.log('  B U I L D\n');
    }

    /**
     * Logs if the build has successfully finished.
     */

  }, {
    key: 'logBuildFinished',
    value: function logBuildFinished() {
      this.logger.log('  ' + (0, _chalk.green)('SUCCESS') + ': Your project has been built successfully.\n');
      this.logger.log(this.getDivider());
    }
  }]);

  return LogHelper;
}();

var logHelper = exports.logHelper = new LogHelper();
exports.default = console;