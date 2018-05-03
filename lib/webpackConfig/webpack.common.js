'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _variables = require('./variables');

var _convertLanguageToISO = require('./helpers/convertLanguageToISO');

var _convertLanguageToISO2 = _interopRequireDefault(_convertLanguageToISO);

var _getAppSettings2 = require('./helpers/getAppSettings');

var _getAppSettings3 = _interopRequireDefault(_getAppSettings2);

var _Themes = require('../Themes');

var _Themes2 = _interopRequireDefault(_Themes);

var _getExtensionsNodeModulesPaths = require('./helpers/getExtensionsNodeModulesPaths');

var _getExtensionsNodeModulesPaths2 = _interopRequireDefault(_getExtensionsNodeModulesPaths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _getAppSettings = (0, _getAppSettings3.default)(),
    language = _getAppSettings.language;

exports.default = {
  context: (0, _path.resolve)(_Themes2.default.getPath()),
  devServer: {
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    publicPath: '/',
    contentBase: (0, _path.resolve)(_Themes2.default.getPath(), 'public'),
    progress: true
  },
  entry: {
    common: [(0, _path.resolve)(_variables.NODE_MODULES, 'babel-polyfill'), (0, _path.resolve)(_variables.NODE_MODULES, 'intl'), (0, _path.resolve)(_variables.NODE_MODULES, 'intl/locale-data/jsonp/' + (0, _convertLanguageToISO2.default)(language) + '.js'), 'react', 'react-dom', 'lodash', 'swiper', 'glamor', 'react-redux', 'react-helmet', 'recompose', 'gsap', 'hammerjs', (0, _path.resolve)(__dirname, './helpers/polyfill')]
  },
  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    modules: [(0, _path.resolve)(_Themes2.default.getPath(), '..', '..', 'node_modules'), (0, _path.resolve)(_Themes2.default.getPath(), 'node_modules'), (0, _path.resolve)(_Themes2.default.getPath(), 'widgets'), (0, _path.resolve)(_variables.EXTENSIONS_PATH)].concat(_toConsumableArray((0, _getExtensionsNodeModulesPaths2.default)()), [(0, _path.resolve)(_variables.NODE_MODULES)])
  },
  performance: {
    hints: false
  },
  target: 'web',
  watchOptions: {
    ignored: /node_modules\b(?!\/@shopgate)\b.*/
  }
};