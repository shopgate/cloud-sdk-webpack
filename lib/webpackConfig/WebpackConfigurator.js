'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebpackConfigurator = function () {
  function WebpackConfigurator() {
    _classCallCheck(this, WebpackConfigurator);

    this.defaultServerConfig = {
      hot: true,
      host: process.env.optionsHost,
      port: process.env.optionsPort,
      progress: true,
      stats: {
        colors: true
      }
    };

    this.config = {};

    this.configPath = null;
  }

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
  }, {
    key: 'loadThemeConfig',
    value: function loadThemeConfig() {
      try {
        var config = require(this.configPath);

        this.config = config.default ? config.default : config;
      } catch (error) {
        throw error;
      }
    }
  }, {
    key: 'getConfig',
    value: function getConfig() {
      return this.config;
    }
  }, {
    key: 'getServerConfig',
    value: function getServerConfig() {
      var themeDevConfig = this.config.devServer || {};

      return _extends({}, this.defaultServerConfig, themeDevConfig);
    }
  }]);

  return WebpackConfigurator;
}();

exports.default = WebpackConfigurator;