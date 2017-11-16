'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _WebpackConfigurator = require('../webpackConfig/WebpackConfigurator');

var _WebpackConfigurator2 = _interopRequireDefault(_WebpackConfigurator);

var _Themes = require('../Themes');

var _Themes2 = _interopRequireDefault(_Themes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebpackDevServer = function () {
  function WebpackDevServer() {
    _classCallCheck(this, WebpackDevServer);

    this.configurator = new _WebpackConfigurator2.default();
    this.webpackConfig = null;
    this.serverConfig = null;
    this.compiler = null;
    this.server = null;

    this.init();
  }

  _createClass(WebpackDevServer, [{
    key: 'init',
    value: function init() {
      this.configurator.setConfigPath(_Themes2.default.getConfig()).loadThemeConfig();

      this.webpackConfig = this.configurator.getConfig();
      this.serverConfig = this.configurator.getServerConfig();
      this.compiler = (0, _webpack2.default)(this.webpackConfig);
      this.server = new _webpackDevServer2.default(this.compiler, this.serverConfig);
    }
  }, {
    key: 'start',
    value: function start() {
      var _serverConfig = this.serverConfig,
          host = _serverConfig.host,
          port = _serverConfig.port;


      this.server.listen(port, host);
    }
  }]);

  return WebpackDevServer;
}();

exports.default = new WebpackDevServer();