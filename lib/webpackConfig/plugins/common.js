'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _chalk = require('chalk');

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _htmlWebpackPlugin = require('html-webpack-plugin');

var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);

var _stringReplaceWebpackPlugin = require('string-replace-webpack-plugin');

var _stringReplaceWebpackPlugin2 = _interopRequireDefault(_stringReplaceWebpackPlugin);

var _progressBarWebpackPlugin = require('progress-bar-webpack-plugin');

var _progressBarWebpackPlugin2 = _interopRequireDefault(_progressBarWebpackPlugin);

var _preloadWebpackPlugin = require('preload-webpack-plugin');

var _preloadWebpackPlugin2 = _interopRequireDefault(_preloadWebpackPlugin);

var _scriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

var _scriptExtHtmlWebpackPlugin2 = _interopRequireDefault(_scriptExtHtmlWebpackPlugin);

var _Themes = require('../../Themes');

var _Themes2 = _interopRequireDefault(_Themes);

var _convertLanguageToISO = require('../helpers/convertLanguageToISO');

var _convertLanguageToISO2 = _interopRequireDefault(_convertLanguageToISO);

var _getThemeLanguage = require('../helpers/getThemeLanguage');

var _getThemeLanguage2 = _interopRequireDefault(_getThemeLanguage);

var _getAppSettings = require('../helpers/getAppSettings');

var _getAppSettings2 = _interopRequireDefault(_getAppSettings);

var _getComponentsSettings = require('../helpers/getComponentsSettings');

var _getComponentsSettings2 = _interopRequireDefault(_getComponentsSettings);

var _getDevConfig2 = require('../helpers/getDevConfig');

var _getDevConfig3 = _interopRequireDefault(_getDevConfig2);

var _getThemeConfig = require('../helpers/getThemeConfig');

var _getThemeConfig2 = _interopRequireDefault(_getThemeConfig);

var _environment = require('../../environment');

var _i18n = require('../../i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var t = (0, _i18n2.default)(__filename);

var appConfig = (0, _getAppSettings2.default)();
var componentsConfig = (0, _getComponentsSettings2.default)();

var _getDevConfig = (0, _getDevConfig3.default)(),
    ip = _getDevConfig.ip,
    apiPort = _getDevConfig.apiPort;

var themeConfig = (0, _getThemeConfig2.default)();

var PUBLIC_FOLDER = 'public';
var nodeEnv = _environment.isStaging ? _environment.ENV_KEY_PRODUCTION : _environment.ENV;

var plugins = [new _webpack2.default.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(nodeEnv),
    APP_CONFIG: JSON.stringify(appConfig),
    COMPONENTS_CONFIG: JSON.stringify(componentsConfig),
    THEME_CONFIG: JSON.stringify(themeConfig),
    THEME: JSON.stringify(_Themes2.default.getName()),

    LANG: JSON.stringify((0, _convertLanguageToISO2.default)(appConfig.language)),
    LOCALE: JSON.stringify((0, _convertLanguageToISO2.default)(appConfig.language)),
    LOCALE_FILE: JSON.stringify((0, _getThemeLanguage2.default)(_Themes2.default.getLanguages(), appConfig.language)),
    IP: JSON.stringify(ip),
    PORT: JSON.stringify(apiPort)
  }
}), new _webpack2.default.optimize.CommonsChunkPlugin({
  minChunks: function minChunks(module, count) {
    return module.resource && module.resource.indexOf('lodash') !== -1 || module.resource && module.resource.indexOf('gsap') !== -1 || module.resource && module.resource.indexOf('hammerjs') !== -1 || module.resource && module.resource.indexOf('swiper') !== -1 || module.resource && module.resource.indexOf('rxjs') !== -1 || count >= 2;
  },
  name: 'common',
  filename: _environment.isProd ? '[name].[chunkhash].js' : '[name].js'
}), new _stringReplaceWebpackPlugin2.default(), new _htmlWebpackPlugin2.default({
  title: appConfig.shopName || _Themes2.default.getName(),
  filename: (0, _path.resolve)(_Themes2.default.getPath(), PUBLIC_FOLDER, 'index.html'),
  template: (0, _path.resolve)(__dirname, '../templates/index.ejs'),
  inject: false,
  cache: false,
  minify: false,
  prefetch: ['**/*.*'],
  preload: ['**/*.*']
}), new _scriptExtHtmlWebpackPlugin2.default({
  sync: ['app', 'common'],
  defaultAttribute: 'async'
}), new _preloadWebpackPlugin2.default({
  rel: 'prefetch',
  as: 'script'
}), new _webpack2.default.LoaderOptionsPlugin({
  debug: _environment.isDev,
  options: {
    context: _Themes2.default.getPath(),
    output: {
      path: (0, _path.resolve)(_Themes2.default.getPath(), PUBLIC_FOLDER)
    }
  }
}), new _webpack2.default.IgnorePlugin(), new _webpack2.default.optimize.ModuleConcatenationPlugin(), new _webpack2.default.HashedModuleIdsPlugin(), new _progressBarWebpackPlugin2.default({
  format: '  ' + t('WEBPACK_PROGRESS', {
    bar: (0, _chalk.blue)(':bar'),
    message: ':msg',
    percent: (0, _chalk.green)(':percent'),
    elapsed: ':elapsed'
  }),
  clear: false
})];

exports.default = plugins;