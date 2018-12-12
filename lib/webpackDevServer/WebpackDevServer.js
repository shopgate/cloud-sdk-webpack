'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpackMerge = require('webpack-merge');

var _webpackMerge2 = _interopRequireDefault(_webpackMerge);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _WebpackConfigurator = require('../webpackConfig/WebpackConfigurator');

var _WebpackConfigurator2 = _interopRequireDefault(_WebpackConfigurator);

var _indexes = require('../webpackConfig/helpers/indexes');

var _indexes2 = _interopRequireDefault(_indexes);

var _Themes = require('../Themes');

var _Themes2 = _interopRequireDefault(_Themes);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _constants = require('../webpackConfig/helpers/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebpackDevServer = function () {
  function WebpackDevServer() {
    var _this = this;

    _classCallCheck(this, WebpackDevServer);

    this.startDevServer = function () {
      _logger2.default.log('');

      _this.configurator.setConfigPath(_Themes2.default.getConfig()).loadThemeConfig();

      _logger.logHelper.logLogoStart();

      _this.webpackConfig = _this.configurator.getConfig();
      _this.serverConfig = _this.configurator.getServerConfig();

      _this.injectModuleResolves();

      _webpackDevServer2.default.addDevServerEntrypoints(_this.webpackConfig, _this.serverConfig);

      _this.compiler = (0, _webpack2.default)(_this.webpackConfig);
      _this.server = new _webpackDevServer2.default(_this.compiler, _this.serverConfig);

      var _serverConfig = _this.serverConfig,
          host = _serverConfig.host,
          port = _serverConfig.port;


      _this.server.listen(port, host);

      _fs2.default.watch('' + _Themes2.default.getPath() + _constants.DEFAULT_CONFIG_PATH, function () {
        (0, _indexes2.default)().catch(_this.handleIndexerErrors);
      });
    };

    this.handleIndexerErrors = function (error) {
      _logger2.default.log(error);
      process.exit(1);
    };

    this.configurator = new _WebpackConfigurator2.default();
    this.webpackConfig = null;
    this.serverConfig = null;
    this.compiler = null;
    this.server = null;
  }

  _createClass(WebpackDevServer, [{
    key: 'start',
    value: function start() {
      var _this2 = this;

      _Themes2.default.init(function () {
        _logger2.default.log('');

        (0, _indexes2.default)().then(_this2.startDevServer).catch(_this2.handleIndexerErrors);
      });
    }
  }, {
    key: 'injectModuleResolves',
    value: function injectModuleResolves() {
      this.webpackConfig = (0, _webpackMerge2.default)(this.webpackConfig, {
        resolve: {
          modules: require('../webpackConfig/webpack.common').default.resolve.modules
        }
      });
    }
  }, {
    key: 'getEntry',
    value: function getEntry() {
      return Array.isArray(this.webpackConfig.entry.app) ? this.webpackConfig.entry.app : [this.webpackConfig.entry.app];
    }
  }]);

  return WebpackDevServer;
}();

exports.default = new WebpackDevServer();