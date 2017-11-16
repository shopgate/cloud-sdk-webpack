'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logHelper = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chalk = require('chalk');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LogHelper = function () {
  function LogHelper() {
    _classCallCheck(this, LogHelper);

    this.divider = '---------------------------------------------------------------------------\n';

    this.prefix = '' + (0, _chalk.green)('Shopgate') + (0, _chalk.blue)('Cloud');

    this.logger = console;
  }

  _createClass(LogHelper, [{
    key: 'getDivider',
    value: function getDivider() {
      return this.divider;
    }
  }, {
    key: 'getPrefix',
    value: function getPrefix() {
      return this.prefix;
    }
  }, {
    key: 'logLogoBuild',
    value: function logLogoBuild() {
      this.logger.log('\n' + this.getDivider());
      this.logger.log('  ' + (0, _chalk.green)('S H O P G A T E') + '   ' + (0, _chalk.blue)('C L O U D'));
      this.logger.log('  B U I L D\n');
    }
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