'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpackMerge = require('webpack-merge');

var _webpackMerge2 = _interopRequireDefault(_webpackMerge);

var _WebpackConfigurator = require('../webpackConfig/WebpackConfigurator');

var _WebpackConfigurator2 = _interopRequireDefault(_WebpackConfigurator);

var _createWidgetsIndex = require('../webpackConfig/helpers/createWidgetsIndex');

var _createWidgetsIndex2 = _interopRequireDefault(_createWidgetsIndex);

var _Themes = require('../Themes');

var _Themes2 = _interopRequireDefault(_Themes);

var _logger = require('../logger');

var _environment = require('../environment');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebpackDevServer = function () {
  function WebpackDevServer() {
    _classCallCheck(this, WebpackDevServer);

    this.configurator = new _WebpackConfigurator2.default();
    this.webpackConfig = null;
    this.serverConfig = null;
    this.compiler = null;
    this.server = null;
  }

  _createClass(WebpackDevServer, [{
    key: 'start',
    value: function start() {
      var _this = this;

      _Themes2.default.init(function () {
        (0, _createWidgetsIndex2.default)();

        _this.configurator.setConfigPath(_Themes2.default.getConfig()).loadThemeConfig();

        _logger.logHelper.logLogoStart();

        _this.webpackConfig = _this.configurator.getConfig();
        _this.serverConfig = _this.configurator.getServerConfig();

        _this.injectModuleResolves();
        _this.extendEntry();

        _webpackDevServer2.default.addDevServerEntrypoints(_this.webpackConfig, _this.serverConfig);

        _this.compiler = (0, _webpack2.default)(_this.webpackConfig);
        _this.server = new _webpackDevServer2.default(_this.compiler, _this.serverConfig);

        var _serverConfig = _this.serverConfig,
            host = _serverConfig.host,
            port = _serverConfig.port;


        _this.server.listen(port, host);
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
    key: 'extendEntry',
    value: function extendEntry() {
      if (!_environment.isDev) {
        return;
      }

      var hotLoaderPatch = (0, _path.resolve)(process.env.SDK_PATH, 'node_modules', 'react-hot-loader/patch');

      var entry = this.getEntry();

      if (entry.includes(hotLoaderPatch)) {
        return;
      }

      this.webpackConfig.entry.app = [hotLoaderPatch].concat(_toConsumableArray(entry));
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